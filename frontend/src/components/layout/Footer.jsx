import React from "react";
import { NavLink } from "react-router-dom";
import nhpcLogo from "../../assets/NHPC_Logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white/90 border-t border-gray-200 text-gray-800" role="contentinfo">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left */}
          <div>
            <img src={nhpcLogo} alt="NHPC" className="h-10 mb-4" />
            <p className="text-sm leading-relaxed">
              NHPC is a Government of India enterprise dedicated to harnessing the power of
              renewable energy for a sustainable future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><NavLink to="/" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Home</NavLink></li>
              <li><NavLink to="/about" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">About</NavLink></li>
              <li><NavLink to="/projects" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Projects</NavLink></li>
              <li><NavLink to="/media" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Media</NavLink></li>
              <li><NavLink to="/careers" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Careers</NavLink></li>
              <li><NavLink to="/contact" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Contact</NavLink></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><NavLink to="/tenders" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Tenders</NavLink></li>
              <li><NavLink to="/reports" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Annual Reports</NavLink></li>
              <li><NavLink to="/sustainability" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Sustainability</NavLink></li>
              <li><NavLink to="/investors" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Investor Relations</NavLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Coorporate office: NHPC Office Complex,
                Sector-33, Faridabad - 121003 (Haryana)</li>
              <li>Email: webmaster@nhpc.nic.in</li>
              <li>Phone: 0129-2588110, 2588500</li>
              <li>Office Time: 9:30AM to 5PM</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto text-center text-xs text-gray-500 flex flex-col md:flex-row justify-center items-center gap-2">
          <span>© {currentYear} NHPC. All rights reserved.</span>
          <NavLink to="/privacy" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Privacy Policy</NavLink>
          <NavLink to="/terms" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Terms &amp; Conditions</NavLink>
          <span>Designed by NHPC Team</span>
        </div>
      </div>
    </footer>
  );
}
