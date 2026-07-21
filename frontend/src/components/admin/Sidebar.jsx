import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, FileEdit, Users, Briefcase, Info, 
  MapPin, Landmark, FileText, Image, Mail, Settings, 
  LogOut, ChevronLeft, ChevronRight, Menu 
} from "lucide-react";

const navItems = [
  { name: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Homepage CMS", to: "/admin/homepage", icon: FileEdit },
  { name: "About NHPC", to: "/admin/about", icon: Info },
  { name: "Projects", to: "/admin/projects", icon: Landmark },
  { name: "Power Stations", to: "/admin/stations", icon: MapPin },
  { name: "Investors", to: "/admin/investors", icon: Users },
  { name: "Tenders", to: "/admin/tenders", icon: FileText },
  { name: "Media Assets", to: "/admin/media", icon: Image },
  { name: "Careers", to: "/admin/careers", icon: Briefcase },
  { name: "Contact Messages", to: "/admin/messages", icon: Mail },
  { name: "Settings", to: "/admin/settings", icon: Settings },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen, collapsed, setCollapsed }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens and redirect
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside 
      className={`fixed top-0 bottom-0 left-0 z-40 bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      <div>
        {/* Sidebar Header Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-850">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 text-white font-extrabold text-lg">
              N
            </div>
            {!collapsed && (
              <span className="font-extrabold text-white text-base tracking-wider whitespace-nowrap">
                NHPC Admin
              </span>
            )}
          </div>

          {/* Collapse Button Desktop */}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation links */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                  ${isActive 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/10" 
                    : "hover:bg-slate-800 hover:text-white text-slate-400"
                  }
                `}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Action Footer */}
      <div className="p-3 border-t border-slate-850">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-950/40 text-slate-400 hover:text-red-400 transition-all focus-visible:outline-none"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
