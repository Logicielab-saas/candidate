import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { ApiError } from "next/dist/server/api-utils";
import type { AddSupportTicket } from "@/core/interfaces";

const supportTicketEndPoint = "support-tickets";

export async function sendSupportTicket(data: AddSupportTicket) {
  try {
    const response = await api.post(supportTicketEndPoint, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to send support ticket`);
    }
    throw error;
  }
}
