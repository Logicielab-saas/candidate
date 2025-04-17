import { ApiError } from "next/dist/server/api-utils";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { Notification } from "@/core/interfaces";

const endpoint = "/employee/notifications";

interface NotificationsResponse {
  message: string;
  notifications: Notification[];
}

export async function fetchNotifications() {
  try {
    const response = await api.get<NotificationsResponse>(endpoint);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to fetch notifications`);
    }
    throw error;
  }
}
