import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import nhpcLogo from "../../assets/NHPC_Logo.png";

const navItems = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Projects", to: "/projects" },
  { name: "Stations", to: "/stations" },
  { name: "Investors", to: "/investors" },
  { name: "Tenders", to: "/tenders" },
  { name: "Media", to: "/media" },
  { name: "Careers", to: "/careers" },
  { name: "Contact", to: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener for background change
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Escape key closes menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const bgClass =
    isHome && !scrolled
      ? "bg-transparent"
      : "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80";

  return (
    <header
      className={`${bgClass} sticky top-0 z-50 transition-colors duration-300`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={nhpcLogo} alt="NHPC" className="h-8 w-auto" />
          <span className="font-semibold text-gray-800 text-lg hidden md:inline">
            NHPC
          </span>
        </NavLink>

        {/* Desktop navigation */}
        <ul className="hidden xl:flex space-x-4 items-center">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          <li>
            <Button
              label="Explore Stations"
              url="/stations"
              variant="primary"
            />
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="xl:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <svg
            className="h-6 w-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-md z-40 flex flex-col pt-16"
          >
            <ul className="flex flex-col space-y-4 px-4">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
              <li className="mt-4">
                <Button
                  label="Explore Stations"
                  url="/stations"
                  variant="primary"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
