/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";

export const fetchExtraData = async (): Promise<any> => {
  try {
    return await serverFetch("/extra-data", {
      method: "GET",
      isPublic: true,
      tags: ["extra-data"],
    });
  } catch (error: any) {
    return { success: false, data: null, message: error.message || "Failed to fetch extra data" };
  }
};
