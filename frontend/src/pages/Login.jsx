import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import api from "../api/api";
import Container from "../components/ui/Container";

export default function Login() {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            setError(null);

            const { data } = await api.post("/auth/login", {
                email,
                password
            });

            // Store credentials token fallback if returned, otherwise count on HTTPOnly cookies
            const token = data.data?.accessToken || data.data?.token;
            if (token) {
                localStorage.setItem("token", token);
            } else {
                // Set temporary flag to pass ProtectedRoute token check when backend uses cookies
                localStorage.setItem("token", "session_active");
            }
            navigate("/admin/dashboard");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || "Failed to sign in.");
        } finally {
            setSubmitting(false);
        }
    };

    const labelClass = "text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5";
    const inputClass = "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

    return (
        <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <Container className="max-w-md w-full">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl space-y-6">
                    <div className="text-center space-y-2">
                        <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Lock size={24} />
                        </div>
                        <h1 className="text-2xl font-extrabold text-slate-950">NHPC Admin Console</h1>
                        <p className="text-xs text-slate-500">Sign in to access homepage CMS and publication tools.</p>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-red-700 text-xs">
                            <AlertCircle className="shrink-0 mt-0.5" size={15} />
                            <span className="font-semibold">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="login-email" className={labelClass}>Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    id="login-email"
                                    type="email"
                                    required
                                    placeholder="admin@nhpc.nic.in"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`${inputClass} pl-10`}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="login-pass" className={labelClass}>Password</label>
                            <div className="relative">
                                <input
                                    id="login-pass"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={inputClass}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500">
                            <label className="flex items-center gap-1.5 font-medium cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                Remember me
                            </label>
                            <span className="hover:text-blue-600 cursor-not-allowed font-medium">Forgot Password?</span>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex w-full h-11 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
                        >
                            {submitting ? "Signing in..." : "Sign In to Console"}
                        </button>
                    </form>
                </div>
            </Container>
        </main>
    );
}
