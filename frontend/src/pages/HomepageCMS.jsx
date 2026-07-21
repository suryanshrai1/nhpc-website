import React from "react";
import useHomepageAdmin from "../hooks/useHomepageAdmin";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import HeroEditor from "../components/admin/HeroEditor";

export default function HomepageCMS() {
  const { heroData, loading, error, saving, saveHero } = useHomepageAdmin();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-3xl text-center text-red-700 max-w-lg mx-auto mt-12">
        <h3 className="font-bold text-lg mb-2">Failed to Load Homepage CMS</h3>
        <p className="text-sm">There was a problem communicating with the administration service.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <HeroEditor 
        initialHero={heroData} 
        onSave={saveHero} 
        saving={saving} 
      />
      
      {/* Informational Placeholders for Future Section Editors */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-slate-500">
        <h3 className="font-bold text-slate-800 text-sm mb-2">Other Homepage Sections</h3>
        <p className="text-xs leading-relaxed">
          Sections like Statistics, Featured Projects, Latest News, and CTA settings will use this layout structure to integrate with the backend lookups/lookups routes.
        </p>
      </div>
    </div>
  );
}
