/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { FieldValues } from "react-hook-form";

export const createContact = async (contactData: FieldValues): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong while sending message",
    };
  }
};
