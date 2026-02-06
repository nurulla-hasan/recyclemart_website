/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidAccessTokenForServerActions } from "@/lib/getValidAccessToken";
import { revalidatePath } from "next/cache";

/**
 * 1. List All Plans
 * Endpoint: GET /subscription/plans
 */
export const fetchAllPlans = async (): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscription/plans`, {
      method: "GET",
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch plans" };
  }
};

/**
 * 2. Get My Subscription
 * Endpoint: GET /subscription/my
 */
export const fetchMySubscription = async (): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscription/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await res.json();
    return result;
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
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscription/change`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planId }),
    });

    const result = await res.json();
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
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscription/cancel`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await res.json();
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
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscription/invoice/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await res.json();
    return result;
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
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscription/payment-method`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
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
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscription/wallet`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await res.json();
    return result;
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
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscription/wallet/topup`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    const result = await res.json();
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
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscription/verify?tran_id=${tran_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/profile/subscription");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to verify payment" };
  }
};
