import React, { useState } from "react";
import ProjectList from "../components/admin/ProjectList";
import ProjectForm from "../components/admin/ProjectForm";
import Container from "../components/ui/Container";

export default function ProjectsCMS() {
  const [editorId, setEditorId] = useState(null); // null = List, -1 = New, positive id = Edit
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
        <ProjectForm projectId={editorId} onBack={handleBack} />
      ) : (
        <ProjectList onEdit={handleEdit} onCreate={handleCreate} />
      )}
    </div>
  );
}
