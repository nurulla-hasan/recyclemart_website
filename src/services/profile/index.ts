/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";
import { revalidatePath } from "next/cache";

/**
 * 1. List All Plans
 * Endpoint: GET /subscription/plans
 */
export const fetchAllPlans = async (): Promise<any> => {
  try {
    return await serverFetch("/subscription/plans", {
      method: "GET",
      isPublic: true,
      tags: ["subscription-plans"],
    });
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch plans" };
  }
};

/**
 * 2. Get My Subscription
 * Endpoint: GET /subscription/my
 */
export const fetchMySubscription = async (): Promise<any> => {
  try {
    return await serverFetch("/subscription/my", {
      method: "GET",
      tags: ["my-subscription"],
    });
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch subscription" };
  }
};

/**
 * 3. Change Subscription
 * Endpoint: POST /subscription/change
 * Body: { planId: string }
 */
export const changeSubscription = async (planId: string): Promise<any> => {
  try {
    const result = await serverFetch("/subscription/change", {
      method: "POST",
      body: { planId },
      updateTag: "my-subscription",
    });
    if (result.success) {
      revalidatePath("/profile/subscription");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to change subscription" };
  }
};

/**
 * 4. Cancel Subscription
 * Endpoint: POST /subscription/cancel
 */
export const cancelSubscription = async (): Promise<any> => {
  try {
    const result = await serverFetch("/subscription/cancel", {
      method: "POST",
      updateTag: "my-subscription",
    });
    if (result.success) {
      revalidatePath("/profile/subscription");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to cancel subscription" };
  }
};

/**
 * 5. Get My Invoices
 * Endpoint: GET /subscription/invoice/my
 */
export const fetchMyInvoices = async (): Promise<any> => {
  try {
    return await serverFetch("/subscription/invoice/my", {
      method: "GET",
      tags: ["my-invoices"],
    });
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch invoices" };
  }
};

/**
 * 6. Update Payment Method
 * Endpoint: POST /subscription/payment-method
 * Body: { paymentMethod: string, accountNumber: string }
 */
export const updatePaymentMethod = async (data: {
  paymentMethod: string;
  accountNumber: string;
}): Promise<any> => {
  try {
    const result = await serverFetch("/subscription/payment-method", {
      method: "POST",
      body: data,
      updateTag: "my-subscription",
    });
    if (result.success) {
      revalidatePath("/profile/subscription");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update payment method" };
  }
};

/**
 * 7. Get Wallet Balance
 * Endpoint: GET /subscription/wallet
 */
export const fetchWalletBalance = async (): Promise<any> => {
  try {
    return await serverFetch("/subscription/wallet", {
      method: "GET",
      tags: ["wallet"],
    });
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch wallet balance" };
  }
};

/**
 * 8. Wallet Topup
 * Endpoint: POST /subscription/wallet/topup
 * Body: { amount: number }
 */
export const topupWallet = async (amount: number): Promise<any> => {
  try {
    const result = await serverFetch("/subscription/wallet/topup", {
      method: "POST",
      body: { amount },
      updateTag: ["wallet", "my-subscription"],
    });
    if (result.success) {
      revalidatePath("/profile/subscription");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to topup wallet" };
  }
};

/**
 * 9. Verify Subscription Payment
 * Endpoint: GET /subscription/verify?tran_id=...
 */
export const verifySubscriptionPayment = async (tran_id: string): Promise<any> => {
  try {
    const result = await serverFetch(`/subscription/verify?tran_id=${tran_id}`, {
      method: "GET",
      cache: "no-store",
      updateTag: ["wallet", "my-subscription", "my-invoices"],
    });
    if (result.success) {
      revalidatePath("/profile/subscription");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to verify payment" };
  }
};
