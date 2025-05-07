/**
 * Server action for fetching static data
 */
"use server";

import { fetchStaticData } from "@/services/static-data";
import { unstable_cache } from "next/cache";

/**
 * Cached version of fetchStaticData
 */
const getCachedStaticData = unstable_cache(
  async (url: string) => {
    const response = await fetchStaticData(url);
    return response;
  },
  ["static-data-cache"],
  {
    revalidate: 86400, // Cache for 24 hours by default
    tags: ["static-data"], // Tag for manual revalidation
  }
);

/**
 * Fetches static data with caching
 * If version differs from stored version, cache will be revalidated
 */
export async function fetchStaticDataAction(url: string) {
  try {
    const response = await getCachedStaticData(url);
    return response;
  } catch (error) {
    console.error("Error fetching static data:", error);
    throw error;
  }
}
