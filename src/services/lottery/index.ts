"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/fetcher";

/**
 * 1. List Lotteries
 * Endpoint: GET /lottery
 */
export const fetchLotteries = async (
  query: Record<string, any> = {},
): Promise<any> => {
  const params = new URLSearchParams(query);
  try {
    return await serverFetch(`/lottery?${params.toString()}`, {
      method: "GET",
      isPublic: true,
      tags: ["lotteries"],
    });
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
  try {
    return await serverFetch("/lottery/my/summary", {
      method: "GET",
      tags: ["lottery-summary"],
    });
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
  try {
    return await serverFetch("/lottery/my/upcoming", {
      method: "GET",
      tags: ["upcoming-lotteries"],
    });
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
  try {
    return await serverFetch(`/lottery/${lotteryId}/join`, {
      method: "POST",
      body: { quantity },
      updateTag: ["lotteries", "lottery-summary", "upcoming-lotteries"],
    });
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
  try {
    return await serverFetch(`/lottery/payment/verify?tran_id=${tran_id}`, {
      method: "GET",
      cache: "no-store",
      updateTag: ["lotteries", "lottery-summary", "lottery-tokens"],
    });
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
  try {
    return await serverFetch(`/lottery/${lotteryId}/my-tokens`, {
      method: "GET",
      tags: ["lottery-tokens", `lottery-tokens-${lotteryId}`],
    });
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error.message || "Failed to fetch lottery tokens",
    };
  }
};
