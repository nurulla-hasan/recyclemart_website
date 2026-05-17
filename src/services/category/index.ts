/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";
import { Category } from "@/types/category.type";

export const fetchAllCategories = async (): Promise<{
  success: boolean;
  data: Category[];
  message?: string;
}> => {
  try {
    return await serverFetch("/category", {
      method: "GET",
      isPublic: true,
      tags: ["categories"],
    });
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.message || "Failed to fetch categories",
    };
  }
};
    
