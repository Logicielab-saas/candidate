/**
 * Job Bookmark Server Actions
 *
 * Handles job bookmarking functionality including fetching saved jobs,
 * saving new jobs, and removing saved jobs.
 */

"use server";

import serverApi from "@/lib/axios-server";
import type { EmploiSaved, Pagination } from "@/core/interfaces";

export interface SavedJobsResponse {
  message: string;
  saved: EmploiSaved[];
  pagination: Pagination;
}

const BOOKMARK_ENDPOINT = "/employee/emploi/save";

//* Fetch saved jobs
export async function fetchSavedJobsAction(
  page: number = 1,
  per_page: number = 10
): Promise<SavedJobsResponse> {
  try {
    const { data } = await serverApi.get(BOOKMARK_ENDPOINT, {
      params: {
        page: page.toString(),
        per_page: per_page.toString(),
      },
      headers: {
        "Cache-Tags": "saved-emplois",
      },
    });

    return data;
  } catch (error) {
    console.error("Fetch saved jobs error:", error);
    return {
      message:
        error instanceof Error ? error.message : "Failed to fetch saved jobs",
      saved: [],
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
      },
    };
  }
}

//* Save job
export async function saveJobAction(uuid: string) {
  try {
    const { data } = await serverApi.post(BOOKMARK_ENDPOINT, {
      emploi_uuid: uuid,
    });

    return data;
  } catch (error) {
    console.error("Save job error:", error);
    return {
      message: error instanceof Error ? error.message : "Failed to save job",
    };
  }
}

//* Unsave job
export async function unsaveJobAction(uuid: string) {
  try {
    const { data } = await serverApi.delete(`${BOOKMARK_ENDPOINT}/${uuid}`);
    return data;
  } catch (error) {
    console.error("Unsave job error:", error);
    return {
      message: error instanceof Error ? error.message : "Failed to unsave job",
    };
  }
}
