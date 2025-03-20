"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./QueryClient";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [queryClient] = useState(
  //     () => new QueryClient({
  //         defaultOptions: {
  //             queries: {
  //                 staleTime: STALE_TIME,          // 5 minutes
  //                 refetchOnWindowFocus: false,    // Don't refetch when window regains focus
  //                 retry: 1,                       // Only retry failed requests once
  //                 refetchOnReconnect: 'always',   // Always refetch when reconnecting
  //             },
  //             mutations: {
  //                 retry: 1,
  //             }
  //         },
  //     })
  // );
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;
