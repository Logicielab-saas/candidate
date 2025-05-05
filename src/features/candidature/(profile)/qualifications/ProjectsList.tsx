"use client";

import { useState } from "react";
import { Code2 } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import CircleLineWrapper from "./CircleLineWrapper";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash } from "lucide-react";
import type { ResumeProject } from "@/core/interfaces/";
import Image from "next/image";
import dynamic from "next/dynamic";
import LoaderOne from "@/components/ui/loader-one";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/core/utils/date";

// Dynamically import dialogs and ImageLightbox with loading states
const AddProjectDialog = dynamic(
  () =>
    import("./dialogs/add/AddProjectDialog").then(
      (mod) => mod.AddProjectDialog
    ),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

const EditProjectDialog = dynamic(
  () =>
    import("./dialogs/edit/EditProjectDialog").then(
      (mod) => mod.EditProjectDialog
    ),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

const DeleteProjectDialog = dynamic(
  () =>
    import("./dialogs/delete/DeleteProjectDialog").then(
      (mod) => mod.DeleteProjectDialog
    ),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

const ImageLightbox = dynamic(
  () =>
    import("@/components/shared/ImageLightbox").then(
      (mod) => mod.ImageLightbox
    ),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

interface ProjectsListProps {
  projects: ResumeProject[] | null;
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ResumeProject | null>(
    null
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<
    Array<{ src: string; alt: string }>
  >([]);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  const t = useTranslations("resumePage.projects");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const formatedDate = (dateString: string) => {
    return formatDate(dateString, "d MMMM yyyy", locale);
  };

  const handleImageClick = (project: ResumeProject, index: number) => {
    const images = Array.isArray(project.image)
      ? project.image.map((url, i) => ({
          src:
            typeof url === "string"
              ? url
              : URL.createObjectURL(url as unknown as Blob),
          alt: `${project.name} - Image ${i + 1}`,
        }))
      : [
          {
            src:
              typeof project.image === "string"
                ? project.image
                : URL.createObjectURL(project.image as unknown as Blob),
            alt: `${project.name} - Image`,
          },
        ];

    setSelectedImages(images);
    setInitialImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title={t("title")}
        icon={<Code2 className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={() => setDialogOpen(true)}
      />
      <div className="space-y-0">
        {projects?.map((project) => (
          <CircleLineWrapper key={project.uuid}>
            <div className="space-y-2">
              <h4 className="text-base font-bold flex justify-between items-center">
                {project.name}
                <div className="flex">
                  <Button
                    variant="ghost"
                    className="cursor-pointer text-primaryHex-600 hover:bg-primaryHex-100 hover:text-primaryHex-600"
                    onClick={() => {
                      setSelectedProject(project);
                      setEditDialogOpen(true);
                    }}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="cursor-pointer text-red-600 hover:bg-red-100 hover:text-red-600"
                    onClick={() => {
                      setSelectedProject(project);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </h4>
              {project.image && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.isArray(project.image) ? (
                    project.image.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
                        onClick={() => handleImageClick(project, index)}
                      >
                        <Image
                          src={imageUrl as unknown as string}
                          alt={`${project.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ))
                  ) : (
                    <div
                      className="relative aspect-video rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
                      onClick={() => handleImageClick(project, 0)}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.name} - Image`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                </div>
              )}
              <p className="text-gray-500">
                {formatedDate(project.date_start)}
                {project.date_end
                  ? ` - ${formatedDate(project.date_end)}`
                  : ` - ${t("current")}`}
              </p>
              {project.description && (
                <p className="mt-2">{project.description}</p>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primaryHex-600 hover:underline block mt-2 w-fit"
                >
                  {tCommon("viewProject")}
                </a>
              )}
              {project.tasks && project.tasks.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-semibold mb-2">
                    {tCommon("tasksLabel")}
                  </h5>
                  <ul className="list-disc list-inside space-y-1">
                    {project.tasks.map((task) => (
                      <li key={task.uuid} className="text-sm">
                        <span className="font-medium">{task.name}</span>
                        {task.description && (
                          <span className="text-gray-600">
                            {" "}
                            - {task.description}
                          </span>
                        )}
                        <span
                          className={`ml-2 text-xs px-2 py-1 rounded-full ${
                            task.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {task.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CircleLineWrapper>
        ))}
        {!projects?.length && (
          <p className="text-muted-foreground text-center py-4">{t("empty")}</p>
        )}
      </div>
      {dialogOpen && (
        <AddProjectDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      )}
      {selectedProject && (
        <>
          {editDialogOpen && (
            <EditProjectDialog
              open={editDialogOpen}
              onOpenChange={setEditDialogOpen}
              project={selectedProject}
            />
          )}
          {deleteDialogOpen && (
            <DeleteProjectDialog
              open={deleteDialogOpen}
              onOpenChange={setDeleteDialogOpen}
              project={selectedProject}
            />
          )}
        </>
      )}
      {lightboxOpen && (
        <ImageLightbox
          isOpen={lightboxOpen}
          onOpenChange={setLightboxOpen}
          images={selectedImages}
          initialIndex={initialImageIndex}
        />
      )}
    </div>
  );
}
