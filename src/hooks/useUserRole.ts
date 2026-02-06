"use client";

import { useUser } from "@/context/UserContext";

export const useUserRole = () => {
  const { user, isLoading } = useUser();

  return {
    role: user?.role || null,
    isLoading,
    isBuyer: user?.role === "BUYER",
    isVendor: user?.role === "VENDOR",
  };
};
