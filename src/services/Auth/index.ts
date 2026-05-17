/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { serverFetch } from '@/lib/fetcher';
import { FieldValues } from 'react-hook-form';

// registerUser
export const signUpUser = async (userData: FormData) => {
  try {
    return await serverFetch('/user/signup', {
      method: 'POST',
      body: userData,
      isPublic: true,
    });
  } catch (error: any) {
    return Error(error);
  }
};

// sendSignupOtpAgain
export const sendSignupOtpAgain = async (userEmail: string) => {
  try {
    return await serverFetch('/user/send-signup-otp-again', {
      method: 'POST',
      body: { userEmail },
      isPublic: true,
    });
  } catch (error: any) {
    return Error(error);
  }
};

// verifySignUpByOTP
export const verifySignUpByOTP = async (userEmail: string, otp: string) => {
  try {
    const result = await serverFetch('/user/verify-signup-otp', {
      method: 'POST',
      body: { userEmail, otp },
      isPublic: true,
    });

    if (result?.success) {
      (await cookies()).set('accessToken', result?.data?.accessToken);
      (await cookies()).set('refreshToken', result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// signInUser
export const signInUser = async (userData: FieldValues): Promise<any> => {
  try {
    const result = await serverFetch('/user/signin', {
      method: 'POST',
      body: userData,
      isPublic: true,
    });

    if (result?.success) {
      (await cookies()).set('accessToken', result?.data?.accessToken);
      (await cookies()).set('refreshToken', result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// updateProfilePhoto
export const updateProfilePhoto = async (data: FormData): Promise<any> => {
  try {
    const result = await serverFetch('/user/update-profile-photo', {
      method: 'PUT',
      body: data,
      updateTag: 'user-profile',
    });
    if (result?.success) {
      (await cookies()).set('accessToken', result?.data?.accessToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// changePassword
export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}): Promise<any> => {
  try {
    const result = await serverFetch('/user/change-password', {
      method: 'PATCH',
      body: data,
      updateTag: 'user-profile',
    });

    if (result?.success) {
      (await cookies()).set('accessToken', result?.data?.accessToken);
      (await cookies()).set('refreshToken', result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// forgotPassword
export const forgotPassword = async (email: string): Promise<any> => {
  try {
    const result = await serverFetch('/user/forgot-password', {
      method: 'POST',
      body: { email },
      isPublic: true,
    });

    if (result?.success) {
      (await cookies()).set('forgotPassToken', result?.data?.token);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// sendForgotPasswordOtpAgain
export const sendForgotPasswordOtpAgain = async (): Promise<any> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('forgotPassToken')?.value;

  try {
    return await serverFetch('/user/send-forgot-password-otp-again', {
      method: 'POST',
      body: { token },
      isPublic: true,
    });
  } catch (error: any) {
    return Error(error);
  }
};

// verifyOtpForForgotPassword
export const verifyOtpForForgotPassword = async (otp: string): Promise<any> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('forgotPassToken')?.value;

  try {
    const result = await serverFetch('/user/verify-forgot-password-otp', {
      method: 'POST',
      body: { token, otp },
      isPublic: true,
    });

    if (result?.success) {
      cookieStore.set('resetPasswordToken', result?.data?.resetPasswordToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// setNewPassword
export const setNewPassword = async (newPassword: string): Promise<any> => {
  const cookieStore = await cookies();
  const resetPasswordToken = cookieStore.get('resetPasswordToken')?.value;

  try {
    const result = await serverFetch('/user/reset-password', {
      method: 'POST',
      body: { resetPasswordToken, newPassword },
      isPublic: true,
    });

    if (result?.success) {
      cookieStore.delete('forgotPassToken');
      cookieStore.delete('resetPasswordToken');
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// fetchMyProfile
export const fetchMyProfile = async (): Promise<any> => {
  try {
    return await serverFetch('/user/profile', {
      method: 'GET',
      tags: ['user-profile'],
    });
  } catch (error: any) {
    return Error(error);
  }
};

// getNewAccessToken
export const getNewAccessToken = async (refreshToken: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/access-token`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// deactiveAccount
export const deactiveAccount = async (userData: FieldValues): Promise<any> => {
  try {
    const result = await serverFetch('/user/deactive-account', {
      method: 'PATCH',
      body: userData,
      updateTag: 'user-profile',
    });
    if (result?.success) {
      const cookieStore = await cookies();
      cookieStore.set('accessToken', result?.data?.accessToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// updateUserData
export const updateUserData = async (userData: FieldValues): Promise<any> => {
  try {
    const result = await serverFetch('/user/update-user-data', {
      method: 'PATCH',
      body: userData,
      updateTag: 'user-profile',
    });
    if (result?.success) {
      const cookieStore = await cookies();
      cookieStore.set('accessToken', result?.data?.accessToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getCurrentUser
export const getCurrentUser = async (): Promise<any> => {
  const accessToken = (await cookies()).get('accessToken')?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

// logOut
export const logOut = async (): Promise<void> => {
  const cookieStore = await cookies();

  // cookieStore.delete('accessToken');
  // cookieStore.delete('refreshToken');

  const allCookies = cookieStore.getAll();

  allCookies.forEach(cookie => {
    cookieStore.delete(cookie.name);
  });
};
