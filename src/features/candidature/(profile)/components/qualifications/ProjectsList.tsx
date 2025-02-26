import React, { useState } from "react";
import { Project } from "@/core/types/project";
import { Lightbulb } from "lucide-react";
import TimeLineListItem from "./TimeLineListItem";
import { SectionHeader } from "./SectionHeader";
import { mockQualifications } from "@/core/mockData/qualifications";
import { AddProjectDialog } from "./dialogs/add/AddProjectDialog";
import { DeleteProjectDialog } from "./dialogs/delete/DeleteProjectDialog";
import { EditProjectDialog } from "./dialogs/edit/EditProjectDialog";

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>(
    mockQualifications.projects
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleAddProject = (newProject: Omit<Project, "id">) => {
    const newId = (projects.length + 1).toString(); // Simple ID generation
    const projectToAdd = { ...newProject, id: newId };
    setProjects((prev) => [...prev, projectToAdd]);
  };

  const handleEditProject = (
    id: string,
    updatedProject: Omit<Project, "id">
  ) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, ...updatedProject } : project
      )
    );
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="Projects"
        icon={<Lightbulb className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={() => setDialogOpen(true)}
      />
      <div className="space-y-0">
        {projects.map((project) => (
          <TimeLineListItem
            key={project.id}
            data={project}
            onEdit={(project) => {
              setSelectedProject(project as Project);
              setEditDialogOpen(true);
            }}
            onDelete={(_id) => {
              setSelectedProject(project);
              setDeleteDialogOpen(true);
            }}
          />
        ))}
      </div>
      <AddProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddProject}
      />
      <EditProjectDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEditProject}
        project={selectedProject as Project}
      />
      {deleteDialogOpen && selectedProject && (
        <DeleteProjectDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteProject}
          project={selectedProject}
        />
      )}
    </div>
  );
}
