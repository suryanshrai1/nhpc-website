import React, { useState } from "react";
import InvestorList from "../components/admin/InvestorList";
import InvestorForm from "../components/admin/InvestorForm";

export default function InvestorsCMS() {
  const [editorId, setEditorId] = useState(null); // null = List, -1/string = New, positive id = Edit
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
    <div className="max-w-6xl mx-auto">
      {isEditing ? (
        <InvestorForm documentId={editorId} onBack={handleBack} />
      ) : (
        <InvestorList onEdit={handleEdit} onCreate={handleCreate} />
      )}
    </div>
  );
}
