"use server";

import { ContactProps } from "@/components/frontend/contact-us";
import api from "@/lib/api";
import axios from "axios";

export async function createContact(data: ContactProps) {
  try {
    const response = await api.post("/contacts", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create contact!";
      throw new Error(message);
    }

    throw error;
  }
}
