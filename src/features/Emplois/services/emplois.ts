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
const endpointSuggestions = "/employee/emploi/search";

export async function fetchEmplois(page: number = 1, per_page: number = 10) {
  try {
    const params: Record<string, number> = {};

    // Only add params if they differ from defaults
    if (page !== 1) params.page = page;
    if (per_page !== 10) params.per_page = per_page;

    const response = await api.get<EmploisResponse>(endpoint, {
      params: Object.keys(params).length ? params : undefined,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to fetch emplois`);
    }
    throw error;
  }
}

export async function fetchEmploisBySlug(slug: string) {
  const response = await api.get<EmploisDetailsResponse>(`${endpoint}/${slug}`);
  return response.data;
}

// TODO: Implement this FUNCTIONALITY NO APP TOMORROW (FRIDAY)
export async function fetchSearchSuggestions(query: string) {
  const response = await api.get<SearchSuggestionsResponse>(
    `${endpointSuggestions}`,
    {
      params: { q: query },
    }
  );
  return response.data;
}
