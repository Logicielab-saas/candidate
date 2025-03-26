import { GetMeResponse } from "@/core/interfaces";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import type { Profile } from "../common/interface";
import axios from "@/lib/axios";

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
  const response = await api.get<Profile>("/employee/user-profile");
  return response.data;
}

export interface UpdateProfileData {
  first_name: string;
  last_name: string;
  phone?: string | null;
  birthdate?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  postal_code?: string | null;
  bio?: string | null;
  image?: File | null;
  is_male: boolean | null;
}

export async function updateProfile(data: UpdateProfileData) {
  const formData = new FormData();

  // Append all fields to FormData
  Object.entries(data).forEach(([key, value]) => {
    // Skip null or undefined values
    if (value === null || value === undefined) return;

    // Handle File object for profile picture
    if (key === "image" && value instanceof File) {
      console.log("Uploading image:", {
        name: value.name,
        type: value.type,
        size: value.size,
      });
      formData.append(key, value, value.name);
    }
    // Handle boolean value for is_male
    else if (key === "is_male") {
      formData.append(key, value ? "1" : "0");
    }
    // Handle other fields
    else if (typeof value === "string") {
      formData.append(key, value);
    }
  });

  // Log FormData contents for debugging
  console.log("FormData entries:");
  for (const pair of formData.entries()) {
    console.log(
      pair[0],
      pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]
    );
  }

  const response = await axios.post<Profile>(
    "/employee/user-profile",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
