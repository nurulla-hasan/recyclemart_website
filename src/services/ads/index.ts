"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/fetcher";
import { AdResponse, AdsResponse } from "@/types/ad.type";

/**
 * 1. Get All Ads
 * Endpoint: GET /ad
 */
export const fetchAllAds = async (query: Record<string, any> = {}): Promise<AdsResponse> => {
  const params = new URLSearchParams(query);
  try {
    return await serverFetch(`/ad?${params.toString()}`, {
      method: "GET",
      isPublic: true,
      revalidate: 0,
      tags: ["ads"],
    });
  } catch (error: any) {
    return { success: false, data: [], message: error.message || "Failed to fetch ads" };
  }
};

/**
 * 1.1 Get Ad By ID
 * Endpoint: GET /ad/{adId}
 */
export const fetchAdById = async (adId: string): Promise<AdResponse> => {
  try {
    return await serverFetch(`/ad/${adId}`, {
      method: "GET",
      isPublic: true,
      tags: [`ad-${adId}`],
    });
  } catch (error: any) {
    return { success: false, data: null as any, message: error.message || "Failed to fetch ad details" };
  }
};

/**
 * 2. Get My Ads
 * Endpoint: GET /ad/my
 */
export const fetchMyAds = async (query: Record<string, any> = {}): Promise<AdsResponse> => {
  const params = new URLSearchParams(query);

  try {
    return await serverFetch(`/ad/my?${params.toString()}`, {
      method: "GET",
      tags: ["my-ads"],
    });
  } catch (error: any) {
    return { success: false, data: [], message: error.message || "Failed to fetch my ads" };
  }
};

/**
 * 3. Create Ad
 * Endpoint: POST /ad (multipart/form-data)
 */
export const createAd = async (formData: FormData): Promise<any> => {
  try {
    return await serverFetch("/ad", {
      method: "POST",
      body: formData,
      updateTag: ["my-ads", "ads"],
    });
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to create ad" };
  }
};

/**
 * 4. Update Ad
 * Endpoint: PATCH /ad/{adId}
 */
export const updateAd = async (adId: string, data: any): Promise<any> => {
  try {
    return await serverFetch(`/ad/${adId}`, {
      method: "PATCH",
      body: data,
      updateTag: ["my-ads", "ads", `ad-${adId}`],
    });
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update ad" };
  }
};

/**
 * 5. Delete Ad
 * Endpoint: DELETE /ad/{adId}
 */
export const deleteAd = async (adId: string): Promise<any> => {
  try {
    return await serverFetch(`/ad/${adId}`, {
      method: "DELETE",
      updateTag: ["my-ads", "ads", `ad-${adId}`],
    });
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete ad" };
  }
};

/**
 * 6. Boost Ad
 * Endpoint: POST /ad/{adId}/boost
 */
export const boostAd = async (adId: string, data: { packageId: string; days: number }): Promise<any> => {
  try {
    return await serverFetch(`/ad/${adId}/boost`, {
      method: "POST",
      body: data,
      updateTag: ["my-ads", "ads", `ad-${adId}`],
    });
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to boost ad" };
  }
};

/**
 * 7. Report Ad
 * Endpoint: POST /ad/{adId}/report
 */
export const reportAd = async (adId: string, data: { reason: string; details?: string }): Promise<any> => {
  try {
    return await serverFetch(`/ad/${adId}/report`, {
      method: "POST",
      body: data,
    });
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to report ad" };
  }
};

/**
 * 8. Track Ad View
 * Endpoint: POST /ad/{adId}/view
 */
export const trackAdView = async (adId: string): Promise<any> => {
  try {
    return await serverFetch(`/ad/${adId}/view`, {
      method: "POST",
      isPublic: true,
    });
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to track ad view" };
  }
};

/**
 * 9. Get Latest Ads
 * Endpoint: GET /ad/latest
 */
export const fetchLatestAds = async (query: Record<string, any> = {}): Promise<AdsResponse> => {
  const params = new URLSearchParams(query);
  try {
    return await serverFetch(`/ad/latest?${params.toString()}`, {
      method: "GET",
      isPublic: true,
      tags: ["ads"],
    });
  } catch (error: any) {
    return { success: false, data: [], message: error.message || "Failed to fetch latest ads" };
  }
};

/**
 * 10. Get Top Ads
 * Endpoint: GET /ad/top
 */
export const fetchTopAds = async (query: Record<string, any> = {}): Promise<AdsResponse> => {
   const params = new URLSearchParams(query);
  try {
    return await serverFetch(`/ad/top?${params.toString()}`, {
      method: "GET",
      isPublic: true,
      tags: ["ads"],
    });
  } catch (error: any) {
    return { success: false, data: [], message: error.message || "Failed to fetch top ads" };
  }
};

/**
 * 11. Get Featured Ads
 * Endpoint: GET /ad/featured
 */
export const fetchFeaturedAds = async (query: Record<string, any> = {}): Promise<AdsResponse> => {
  const params = new URLSearchParams(query);
  try {
    return await serverFetch(`/ad/featured?${params.toString()}`, {
      method: "GET",
      isPublic: true,
      tags: ["ads"],
    });
  } catch (error: any) {
    return { success: false, data: [], message: error.message || "Failed to fetch featured ads" };
  }
};
