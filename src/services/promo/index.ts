/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const fetchExtraData = async (): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/extra-data`, {
      method: "GET",
      next: { tags: ["extra-data"], revalidate: 300 }, // Cache for 5 minutes
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, data: null, message: error.message || "Failed to fetch extra data" };
  }
};
