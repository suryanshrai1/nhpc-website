import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Investors from "./pages/Investors";
import Tenders from "./pages/Tenders";
import TenderDetails from "./pages/TenderDetails";
import About from "./pages/About";
import Media from "./pages/Media";
import MediaDetails from "./pages/MediaDetails";
import Careers from "./pages/Careers";
import CareerDetails from "./pages/CareerDetails";
import PowerStations from "./pages/PowerStations";
import PowerStationDetails from "./pages/PowerStationDetails";
import StationsCMS from "./pages/StationsCMS";
import Contact from "./pages/Contact";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import HomepageCMS from "./pages/HomepageCMS";
import ProjectsCMS from "./pages/ProjectsCMS";
import AboutCMS from "./pages/AboutCMS";
import MediaCMS from "./pages/MediaCMS";
import TendersCMS from "./pages/TendersCMS";
import CareersCMS from "./pages/CareersCMS";
import InvestorsCMS from "./pages/InvestorsCMS";
import ContactMessagesCMS from "./pages/ContactMessagesCMS";
import Login from "./pages/Login";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/tenders" element={<Tenders />} />
        <Route path="/tenders/:slug" element={<TenderDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/media" element={<Media />} />
        <Route path="/media/:id" element={<MediaDetails />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:slug" element={<CareerDetails />} />
        <Route path="/stations" element={<PowerStations />} />
        <Route path="/stations/:slug" element={<PowerStationDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin Login Route */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Panel Console */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          {/* Fallbacks */}
          <Route path="/admin/homepage" element={<HomepageCMS />} />
          <Route path="/admin/about" element={<AboutCMS />} />
          <Route path="/admin/projects" element={<ProjectsCMS />} />
          <Route path="/admin/stations" element={<StationsCMS />} />
          <Route path="/admin/investors" element={<InvestorsCMS />} />
          <Route path="/admin/tenders" element={<TendersCMS />} />
          <Route path="/admin/media" element={<MediaCMS />} />
          <Route path="/admin/careers" element={<CareersCMS />} />
          <Route path="/admin/messages" element={<ContactMessagesCMS />} />
          <Route path="/admin/settings" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;