import { GetMeResponse } from "@/core/interfaces";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { Profile } from "../common/interface";

export async function getCurrentUser() {
  try {
    const response = await api.get<GetMeResponse>(`/employee/user`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to get current user");
    }
    throw error;
  }
}

export async function getProfile() {
  try {
    const response = await api.get<Profile>(`/employee/user-profile`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to get profile");
    }
    throw error;
  }
}

export type UpdateProfileData = Partial<
  Omit<Profile, "uuid" | "user_id" | "deleted_at">
>;

export async function updateProfile(data: UpdateProfileData) {
  try {
    const response = await api.post<Profile>(`/employee/user-profile`, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError?.message || "Failed to update profile");
    }
    throw error;
  }
}
