"use server";

import api from "@/lib/api";
import axios from "axios";

export type Analytics = {
  title: string;
  count: number;
};

export async function getAllAnalytics(schoolId: string) {
  try {
    const response = await api.get(`/analytics/school/${schoolId}`);
    const analytics = response.data.data;

    return analytics as Analytics[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create contact!";
      throw new Error(message);
    }

    throw error;
  }
}
