import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

function Project({ project, setProjects, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          currentProject={project}
          setProjects={setProjects}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          setProjects={setProjects}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Project;
