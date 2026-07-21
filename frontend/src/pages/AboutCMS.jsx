import React, { useState } from "react";
import LeadershipList from "../components/admin/LeadershipList";
import LeadershipForm from "../components/admin/LeadershipForm";
import Container from "../components/ui/Container";

export default function AboutCMS() {
  const [editorId, setEditorId] = useState(null); // null = List, positive id = Edit
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (id) => {
    setEditorId(id);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setEditorId(null);
    setIsEditing(true);
  };

  const handleBack = () => {
    setEditorId(null);
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {isEditing ? (
        <LeadershipForm leaderId={editorId} onBack={handleBack} />
      ) : (
        <>
          {/* Overview Static CMS description section */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">Corporate Profile &amp; Mission</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              The public About page draws content dynamically from organization profile constants. You can manage the board of directors and executive leadership profiles here.
            </p>
          </div>

          <LeadershipList onEdit={handleEdit} onCreate={handleCreate} />
        </>
      )}
    </div>
  );
}
