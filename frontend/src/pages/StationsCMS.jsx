import React, { useState } from "react";
import StationList from "../components/admin/StationList";
import StationForm from "../components/admin/StationForm";

export default function StationsCMS() {
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
        <StationForm stationId={editorId} onBack={handleBack} />
      ) : (
        <StationList onEdit={handleEdit} onCreate={handleCreate} />
      )}
    </div>
  );
}
