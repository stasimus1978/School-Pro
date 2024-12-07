"use server";

import api from "@/lib/api";
import { ParentCreateProps, ParentItem } from "@/types/types";
import axios from "axios";

export async function createParent(data: ParentCreateProps) {
  try {
    const response = await api.post("/parents", data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create Parent!";
      throw new Error(message);
    }

    throw error;
  }
}

export async function deleteParent(id: string) {
  console.log("deleted", id);

  return {
    ok: true,
  };
}

export async function getAllParents() {
  try {
    const response = await api.get("/parents");
    const parents = response.data.data;

    return parents as ParentItem[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create contact!";
      throw new Error(message);
    }

    throw error;
  }
}
