import React, { useState } from "react";
import CareerList from "../components/admin/CareerList";
import CareerForm from "../components/admin/CareerForm";

export default function CareersCMS() {
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
        <CareerForm careerId={editorId} onBack={handleBack} />
      ) : (
        <CareerList onEdit={handleEdit} onCreate={handleCreate} />
      )}
    </div>
  );
}
