import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { ResumeProject, ProjectTask } from "@/core/interfaces";

const endpoint = "/employee/resume/project";

// Type for creating a new task without uuid
export type CreateTaskDTO = Omit<ProjectTask, "uuid">;

// Omit both uuid and tasks from ResumeProject, then add our CreateTaskDTO[] type for tasks
export type CreateProjectDTO = Omit<
  ResumeProject,
  "uuid" | "tasks" | "image"
> & {
  tasks: CreateTaskDTO[];
  image: File[] | null;
};

export type UpdateProjectDTO = Partial<CreateProjectDTO> & {
  uuid: string;
};

export type ProjectDTO = CreateProjectDTO | UpdateProjectDTO;

export async function handleResumeProject(data: ProjectDTO) {
  try {
    const formData = new FormData();

    // Add basic project fields
    if ("name" in data && data.name) formData.append("name", data.name);
    if ("date_start" in data && data.date_start)
      formData.append("date_start", data.date_start);
    if ("date_end" in data && data.date_end)
      formData.append("date_end", data.date_end);
    if ("description" in data && data.description)
      formData.append("description", data.description);
    if ("url" in data && data.url) formData.append("url", data.url);
    if ("uuid" in data) formData.append("uuid", data.uuid);

    // Append tasks if they exist
    if ("tasks" in data && data.tasks) {
      data.tasks.forEach((task, index) => {
        formData.append(`tasks[${index}][name]`, task.name);
        if (task.description) {
          formData.append(`tasks[${index}][description]`, task.description);
        }
        formData.append(`tasks[${index}][status]`, task.status);
      });
    }

    // Add images if they exist
    if ("image" in data && data.image && data.image.length > 0) {
      data.image.forEach((file) => {
        formData.append("image", file);
      });
    }

    const response = await api.post<ResumeProject>(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      const action = "uuid" in data ? "update" : "create";
      throw new Error(apiError?.message || `Failed to ${action} project`);
    }
    throw error;
  }
}

export async function deleteResumeProject(uuid: string) {
  try {
    await api.delete(`${endpoint}/${uuid}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to delete project");
    }
    throw error;
  }
}
