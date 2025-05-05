import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type {
  Emplois,
  EmploisDetails,
  Pagination,
  SearchSuggestions,
} from "@/core/interfaces";
import { hasAccessToken } from "@/lib/check-access-token";

export interface EmploisResponse {
  message: string;
  emplois: Emplois[];
  pagination: Pagination;
}

export interface EmploisDetailsResponse {
  message: string;
  emploi: EmploisDetails;
}

export interface SearchSuggestionsResponse {
  message: string;
  results: SearchSuggestions[];
  pagination: Pagination;
}

const isAuthenticated = hasAccessToken();

const endpoint = isAuthenticated ? "/employee/emplois" : "/emplois";
const endpointSuggestions = "/emploi/search";

export async function fetchEmplois(
  page: number = 1,
  per_page: number = 10,
  searchText?: string,
  city?: string
) {
  try {
    const params: Record<string, string | number> = {};

    // Only add params if they differ from defaults or are defined
    if (page !== 1) params.page = page;
    if (per_page !== 10) params.per_page = per_page;
    if (searchText) params.q = searchText;
    if (city) params.city = city;
    if (!isAuthenticated) params.token_device = "STATIC_TOKEN";

    const response = await api.get<EmploisResponse>(endpoint, {
      params: Object.keys(params).length ? params : undefined,
    });
    // Normalize response to always have emplois and pagination
    const data = response.data;
    if (typeof data !== "object" || data === null) {
      return { emplois: [], pagination: null, message: "No Emplois Found" };
    }
    // If emplois is missing, treat as empty array
    if (!Array.isArray(data.emplois)) {
      data.emplois = [];
    }
    // If pagination is missing, set to default Pagination object
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
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to fetch emplois`);
    }
    throw error;
  }
}

export async function fetchEmploisBySlug(slug: string) {
  const params = !isAuthenticated ? { token_device: "STATIC_TOKEN" } : {};

  const response = await api.get<EmploisDetailsResponse>(
    `${endpoint}/${slug}`,
    {
      params,
    }
  );
  return response.data;
}

// TODO: Implement this FUNCTIONALITY NO APP TOMORROW (FRIDAY)
export async function fetchSearchSuggestions(params: {
  q?: string;
  city?: string;
}) {
  const response = await api.get<SearchSuggestionsResponse>(
    `${endpointSuggestions}`,
    {
      params: {
        ...(params.q ? { q: params.q } : {}),
        ...(params.city ? { city: params.city } : {}),
      },
    }
  );
  return response.data;
}
