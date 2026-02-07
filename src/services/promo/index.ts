/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const fetchAllPromos = async (): Promise<{
  success: boolean;
  data: any[];
  message?: string;
}> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/promo`, {
      method: "GET",
      next: { tags: ["promos"], revalidate: 3600 }, // Cache for 1 hour
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.message || "Failed to fetch promos",
    };
  }
};
