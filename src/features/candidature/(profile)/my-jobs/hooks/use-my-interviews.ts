import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchInterviews } from "../services/my-interviews";
import { useTabsCountStore } from "../store/tabs-count.store";
import { useEffect } from "react";

export const INTERVIEWS_QUERY_KEY = ["interviews"];

export function useFetchInterviews(page: number = 1, perPage: number = 10) {
  // Get the setter from the tabs count store
  const setInterviewsCount = useTabsCountStore(
    (state) => state.setInterviewsCount
  );

  const { data, isLoading, error } = useQuery({
    queryKey: [...INTERVIEWS_QUERY_KEY, page, perPage],
    queryFn: () => fetchInterviews(page, perPage),
    placeholderData: keepPreviousData,
  });

  // Update the count in the store when data changes
  useEffect(() => {
    if (data?.interviews?.length !== undefined) {
      setInterviewsCount(data.interviews.length);
    }
  }, [data?.interviews?.length, setInterviewsCount]);

  return { data, isLoading, error };
}
