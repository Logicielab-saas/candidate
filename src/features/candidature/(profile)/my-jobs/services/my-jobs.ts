import api from "@/lib/axios";

const saveEndpoint = "/employee/emploi/save";
const sentApplicationsEndpoint = "/employee/emploi/sent";
export async function fetchSavedJobs() {
  const response = await api.get(`${saveEndpoint}`);
  return response.data;
}

export async function SaveEmplois(uuid: string) {
  const response = await api.post(`${saveEndpoint}`, { emploi_uuid: uuid });
  return response.data;
}

export async function CancelSaveEmplois(uuid: string) {
  const response = await api.delete(`${saveEndpoint}/${uuid}`);
  return response.data;
}

export async function fetchSentApplications() {
  const response = await api.get(`${sentApplicationsEndpoint}`);
  return response.data;
}
