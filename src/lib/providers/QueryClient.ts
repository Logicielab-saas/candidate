import { QueryClient, isServer } from "@tanstack/react-query";

const STALE_TIME = 1000 * 60 * 20; // 20 minutes

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME, // 20 minutes
        refetchOnWindowFocus: false, // Don't refetch when window regains focus
        retry: 1, // Only retry failed requests once
        refetchOnReconnect: "always", // Always refetch when reconnecting
      },
      mutations: {
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;
export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
