"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidAccessTokenForServerActions } from "@/lib/getValidAccessToken";
import { updateTag } from "next/cache";
import { AdResponse, AdsResponse } from "@/types/ad.type";

/**
 * 1. Get All Ads
 * Endpoint: GET /ad
 */
export const fetchAllAds = async (query: Record<string, any> = {}): Promise<AdsResponse> => {
  const params = new URLSearchParams(query);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad?${params.toString()}`, {
      method: "GET",
      cache: "no-store",
    });

    const result = await res.json();
    return result;
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/${adId}`, {
      method: "GET",
      next: { tags: [`ad-${adId}`] },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, data: null as any, message: error.message || "Failed to fetch ad details" };
  }
};

/**
 * 2. Get My Ads
 * Endpoint: GET /ad/my
 */
export const fetchMyAds = async (query: Record<string, any> = {}): Promise<AdsResponse> => {
  const accessToken = await getValidAccessTokenForServerActions();
  const params = new URLSearchParams(query);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/my?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["my-ads"], revalidate: 300 },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, data: [], message: error.message || "Failed to fetch my ads" };
  }
};

/**
 * 3. Create Ad
 * Endpoint: POST /ad (multipart/form-data)
 */
export const createAd = async (formData: FormData): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const result = await res.json();
    if (result.success) {
      updateTag("my-ads");
      updateTag("ads");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to create ad" };
  }
};

/**
 * 4. Update Ad
 * Endpoint: PATCH /ad/{adId}
 */
export const updateAd = async (adId: string, data: any): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/${adId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      updateTag("my-ads");
      updateTag("ads");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update ad" };
  }
};

/**
 * 5. Delete Ad
 * Endpoint: DELETE /ad/{adId}
 */
export const deleteAd = async (adId: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/${adId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      updateTag("my-ads");
      updateTag("ads");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete ad" };
  }
};

/**
 * 6. Boost Ad
 * Endpoint: POST /ad/{adId}/boost
 */
export const boostAd = async (adId: string, data: { packageId: string; days: number }): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/${adId}/boost`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      updateTag("my-ads");
      updateTag("ads");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to boost ad" };
  }
};

/**
 * 7. Report Ad
 * Endpoint: POST /ad/{adId}/report
 */
export const reportAd = async (adId: string, data: { reason: string; details?: string }): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/${adId}/report`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/${adId}/view`, {
      method: "POST",
    });

    const result = await res.json();
    return result;
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/latest?${params.toString()}`, {
      method: "GET",
      next: { tags: ["ads"], revalidate: 300 },
    });

    const result = await res.json();
    return result;
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/top?${params.toString()}`, {
      method: "GET",
      next: { tags: ["ads"], revalidate: 300 },
    });

    const result = await res.json();
    return result;
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ad/featured?${params.toString()}`, {
      method: "GET",
      next: { tags: ["ads"], revalidate: 300 },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, data: [], message: error.message || "Failed to fetch featured ads" };
  }
};
