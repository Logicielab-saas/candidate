import { AxiosError } from "axios";
import api from "@/lib/axios";
import type { CreateReportEmploi, ReportEmploi } from "@/core/interfaces";
import type { ApiError } from "next/dist/server/api-utils";

const reportEndPoint = "employee/emploi/report";
const getReportEndPoint = "employee/emploi/reports";

interface ReportEmploiResponse {
  message: string;
  data: ReportEmploi[];
}

export async function fetchReportEmploi() {
  try {
    const response = await api.get<ReportEmploiResponse>(getReportEndPoint);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to get report emploi`);
    }
    throw error;
  }
}

export async function ReportEmploi(data: CreateReportEmploi) {
  try {
    const response = await api.post(reportEndPoint, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || `Failed to report job`);
    }
    throw error;
  }
}
