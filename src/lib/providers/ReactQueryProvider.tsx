'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

const STALE_TIME = 1000 * 60 * 10; // 10 minutes

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: STALE_TIME,          // 5 minutes
                    refetchOnWindowFocus: false,    // Don't refetch when window regains focus
                    retry: 1,                       // Only retry failed requests once
                    refetchOnReconnect: 'always',   // Always refetch when reconnecting
                },
                mutations: {
                    retry: 1,
                }
            },
        })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default ReactQueryProvider;
