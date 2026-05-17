"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/fetcher";

/**
 * 1. List My Favourites
 * Endpoint: GET /favourite/my
 */
export const fetchMyFavorites = async (page = 1, limit = 10): Promise<any> => {
  try {
    return await serverFetch(`/favourite/my?page=${page}&limit=${limit}`, {
      method: "GET",
      tags: ["favourites"],
    });
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch favourites" };
  }
};

/**
 * 2. Add Favourite
 * Endpoint: POST /favourite/{adId}
 */
export const addFavorite = async (adId: string): Promise<any> => {
  try {
    return await serverFetch(`/favourite/${adId}`, {
      method: "POST",
      updateTag: "favourites",
    });
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to add favourite" };
  }
};

/**
 * 3. Remove Favourite
 * Endpoint: DELETE /favourite/{adId}
 */
export const removeFavorite = async (adId: string): Promise<any> => {
  try {
    return await serverFetch(`/favourite/${adId}`, {
      method: "DELETE",
      updateTag: "favourites",
    });
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to remove favourite" };
  }
};
