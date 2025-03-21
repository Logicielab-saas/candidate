/**
 * Recent Searches Store
 *
 * Manages the state of recent job searches using Zustand
 * Features:
 * - Stores up to 5 recent searches
 * - Persists to localStorage
 * - Prevents duplicate searches
 * - Handles search addition and removal
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentSearch {
  id: string;
  searchText?: string;
  city?: string;
  timestamp: Date;
}

interface RecentSearchesState {
  searches: RecentSearch[];
  addSearch: (searchText?: string, city?: string) => void;
  removeSearch: (id: string) => void;
}

const MAX_RECENT_SEARCHES = 5;

export const useRecentSearchesStore = create<RecentSearchesState>()(
  persist(
    (set) => ({
      searches: [],
      addSearch: (searchText?: string, city?: string) => {
        // Only add if either searchText or city is present
        if (!searchText && !city) return;

        set((state) => {
          const newSearch: RecentSearch = {
            id: Date.now().toString(),
            searchText,
            city,
            timestamp: new Date(),
          };

          // Remove duplicates and limit to MAX_RECENT_SEARCHES
          const updatedSearches = [
            newSearch,
            ...state.searches.filter(
              (search) =>
                !(
                  search.searchText === newSearch.searchText &&
                  search.city === newSearch.city
                )
            ),
          ].slice(0, MAX_RECENT_SEARCHES);

          return { searches: updatedSearches };
        });
      },
      removeSearch: (id: string) =>
        set((state) => ({
          searches: state.searches.filter((search) => search.id !== id),
        })),
    }),
    {
      name: "jobDashboard_recentSearches",
      // Convert dates to strings on storage and back to Date objects on retrieval
      partialize: (state) => ({
        searches: state.searches.map((search) => ({
          ...search,
          timestamp: search.timestamp.toISOString(),
        })),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.searches = state.searches.map((search) => ({
            ...search,
            timestamp: new Date(search.timestamp),
          }));
        }
      },
    }
  )
);
