import React from "react";
import { Menu, Bell, User, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Topbar({ setSidebarOpen, title }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-30 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {/* Toggle Hamburger Mobile */}
        <button
          onClick={() => setSidebarOpen(prev => !prev)}
          className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
          aria-label="Toggle Sidebar Menu"
        >
          <Menu size={20} />
        </button>

        {/* Page Title */}
        <h1 className="text-lg font-bold text-slate-900 capitalize">
          {title || "NHPC Admin Console"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Placeholder */}
        <div className="relative hidden sm:block w-48 md:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search console..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            disabled
          />
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-xl hover:bg-slate-50 text-slate-500 relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-blue-600 rounded-full" />
        </button>

        <div className="h-8 w-px bg-slate-200" />

        {/* Profile menu dropdown details */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 border border-slate-200 shrink-0">
            <User size={16} />
          </div>
          <div className="hidden lg:block text-left">
            <span className="block text-xs font-bold text-slate-800 leading-none">NHPC Administrator</span>
            <span className="block text-[10px] text-slate-400 mt-0.5 leading-none">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
