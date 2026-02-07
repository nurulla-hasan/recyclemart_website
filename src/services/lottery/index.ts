"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidAccessTokenForServerActions } from "@/lib/getValidAccessToken";
import { updateTag } from "next/cache";

/**
 * 1. List Lotteries
 * Endpoint: GET /lottery
 */
export const fetchLotteries = async (
  query: Record<string, any> = {},
): Promise<any> => {
  const params = new URLSearchParams(query);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/lottery?${params.toString()}`,
      {
        method: "GET",
        next: { tags: ["lotteries"], revalidate: 300 },
      },
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.message || "Failed to fetch lotteries",
    };
  }
};

/**
 * 2. Get My Summary
 * Endpoint: GET /lottery/my/summary
 */
export const fetchLotterySummary = async (): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/lottery/my/summary`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { tags: ["lottery-summary"] },
      },
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error.message || "Failed to fetch lottery summary",
    };
  }
};

/**
 * 2.1 Get My Upcoming Lotteries
 * Endpoint: GET /lottery/my/upcoming
 */
export const fetchUpcomingLotteries = async (): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/lottery/my/upcoming`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { tags: ["upcoming-lotteries"] },
      },
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.message || "Failed to fetch upcoming lotteries",
    };
  }
};

/**
 * 3. Join Lottery
 * Endpoint: POST /lottery/{lotteryId}/join
 */
export const joinLottery = async (
  lotteryId: string,
  quantity: number = 1,
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/lottery/${lotteryId}/join`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ quantity }),
      },
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to join lottery",
    };
  }
};

/**
 * 4. Validate Lottery Payment
 * Endpoint: GET /lottery/payment/verify?tran_id={tran_id}
 */
export const verifyLotteryPayment = async (tran_id: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/lottery/payment/verify?tran_id=${tran_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const result = await res.json();
    updateTag("lotteries");
    updateTag("lottery-summary");
    updateTag("lottery-tokens");
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to verify lottery payment",
    };
  }
};

/**
 * 5. Get My Tokens
 * Endpoint: GET /lottery/{lotteryId}/my-tokens
 */
export const fetchMyLotteryTokens = async (lotteryId: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/lottery/${lotteryId}/my-tokens`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { tags: ["lottery-tokens", `lottery-tokens-${lotteryId}`] },
      },
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error.message || "Failed to fetch lottery tokens",
    };
  }
};
