"use server";

import api from "@/lib/api";
import { StreamCreateProps, StreamItem } from "@/types/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function createStream(data: StreamCreateProps) {
  try {
    const response = await api.post("/streams", data);

    revalidatePath("/dashboard/academics/classes");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create Stream!";
      throw new Error(message);
    }

    throw error;
  }
}

export async function deleteStream(id: string) {
  console.log("deleted", id);

  return {
    ok: true,
  };
}

export async function getAllStreams() {
  try {
    const response = await api.get("/streams");
    const streams = response.data.data;

    return streams as StreamItem[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create contact!";
      throw new Error(message);
    }

    throw error;
  }
}
