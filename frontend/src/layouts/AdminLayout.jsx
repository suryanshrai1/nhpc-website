import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Map route paths to friendly titles
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("homepage")) return "Homepage CMS";
    if (path.includes("about")) return "About NHPC Content";
    if (path.includes("projects")) return "Projects Registry";
    if (path.includes("stations")) return "Power Stations Portfolio";
    if (path.includes("investors")) return "Investor Relations CMS";
    if (path.includes("tenders")) return "Tenders Management";
    if (path.includes("media")) return "Media Assets Library";
    if (path.includes("careers")) return "Careers openings";
    if (path.includes("messages")) return "Contact Enquiries";
    if (path.includes("settings")) return "Global Settings";
    return "Dashboard Summary";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Panel Wrapper */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300
          ${collapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        <Topbar setSidebarOpen={setSidebarOpen} title={getPageTitle()} />

        {/* Dynamic Nested Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
