/**
 * Emplois Server Actions
 *
 * Handles job-related server actions including fetching jobs, job details,
 * and search suggestions. Includes proper error handling and type safety.
 */

"use server";

import type {
  Emplois,
  EmploisDetails,
  Pagination,
  SearchSuggestions,
} from "@/core/interfaces";
import serverApi from "@/lib/axios-server";

interface EmploisResponse {
  message: string;
  emplois: Emplois[];
  pagination: Pagination;
}

interface EmploisDetailsResponse {
  message: string;
  emploi: EmploisDetails;
}

interface SearchSuggestionsResponse {
  message: string;
  results: SearchSuggestions[];
  pagination: Pagination;
}

interface FetchEmploisParams {
  page?: number;
  per_page?: number;
  q?: string;
  city?: string;
}

export async function fetchEmploisAction(
  params: FetchEmploisParams
): Promise<EmploisResponse> {
  try {
    const { data } = await serverApi.get("/emplois", {
      params: {
        page: params.page?.toString() || "1",
        per_page: params.per_page?.toString() || "10",
        ...(params.q ? { q: params.q } : {}),
        ...(params.city ? { city: params.city } : {}),
      },
      headers: {
        "Cache-Tags": "emplois",
      },
    });

    // Normalize response
    if (typeof data !== "object" || data === null) {
      return {
        emplois: [],
        pagination: {
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: 0,
        },
        message: "No Emplois Found",
      };
    }

    if (!Array.isArray(data.emplois)) {
      data.emplois = [];
    }

    if (!data.pagination) {
      data.pagination = {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
      };
    }

    return data;
  } catch (error) {
    console.error("Fetch emplois error:", error);
    return {
      emplois: [],
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
      },
      message: error instanceof Error ? error.message : "Failed to fetch jobs",
    };
  }
}
export async function fetchEmploiBySlugAction(
  slug: string
): Promise<EmploisDetailsResponse> {
  try {
    const { data } = await serverApi.get(`/emplois/${slug}`, {
      headers: {
        "Cache-Tags": `emploi-${slug}`,
      },
    });

    return data;
  } catch (error) {
    console.error("Fetch emploi details error:", error);
    throw error;
  }
}
export async function fetchSearchSuggestionsAction(params: {
  q?: string;
  city?: string;
}): Promise<SearchSuggestionsResponse> {
  try {
    const { data } = await serverApi.get("/emploi/search", {
      params: {
        ...(params.q ? { q: params.q } : {}),
        ...(params.city ? { city: params.city } : {}),
      },
    });

    return data;
  } catch (error) {
    console.error("Fetch search suggestions error:", error);
    return {
      results: [],
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
      },
      message:
        error instanceof Error ? error.message : "Failed to fetch suggestions",
    };
  }
}
