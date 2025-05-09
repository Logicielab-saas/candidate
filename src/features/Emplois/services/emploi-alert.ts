import api from "@/lib/axios";
import type { EmploiAlertResponse } from "@/core/interfaces";

const endpoint = "employee/emploi/alert";

export async function getEmploiAlerts() {
  const response = await api.get<EmploiAlertResponse>(`${endpoint}`);
  return response.data;
}
