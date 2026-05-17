/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { serverFetch } from "@/lib/fetcher";
import { FieldValues } from "react-hook-form";

export const createContact = async (contactData: FieldValues): Promise<any> => {
  try {
    return await serverFetch("/contact", {
      method: "POST",
      isPublic: true,
      body: contactData,
    });
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong while sending message",
    };
  }
};
