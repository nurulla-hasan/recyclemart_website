/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const fetchExtraData = async (): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/extra-data`, {
      method: "GET",
      next: { tags: ["extra-data"], revalidate: 3600 },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, data: null, message: error.message || "Failed to fetch extra data" };
  }
};

export const fetchAllPromos = async (): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/promo`, {
      method: "GET",
      next: { tags: ["promos"] },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, data: [], message: error.message || "Failed to fetch promos" };
  }
};
