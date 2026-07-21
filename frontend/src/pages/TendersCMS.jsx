import React, { useState } from "react";
import TenderList from "../components/admin/TenderList";
import TenderForm from "../components/admin/TenderForm";

export default function TendersCMS() {
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
        <TenderForm tenderId={editorId} onBack={handleBack} />
      ) : (
        <TenderList onEdit={handleEdit} onCreate={handleCreate} />
      )}
    </div>
  );
}
