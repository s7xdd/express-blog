"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { apiEndpoints } from "../../config/api-setup/api-endpoints";
import { isUserVerified } from "../../utils/helper/auth-functions";
import { handleApiRequest } from "../../config/wrapper/api-wrapper";
import {
  AuthState,
  ChangePasswordFormProps,
  LoginResponseProps,
  ResetPasswordFormProps,
  SetPasswordFormProps,
} from "../../types/store/auth-types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      userRole: null,
      isVerified: false,
      isAuthenticated: false,
      guestData: null,
      isGuestAuthenticated: false,
      guestToken: null,

      login: async (userData) => {
        const { data, error }: { data: LoginResponseProps; error: any } = await handleApiRequest(
          apiEndpoints.auth.login,
          "post",
          {
            data: userData,
            toastError: true,
            toastSuccess: true,
          }
        );

        const isVerified = isUserVerified(data?.data);
        if (data && data?.data && isVerified) {
          const { token } = data.data;
          set({
            user: data.data,
            token,
            isAuthenticated: isVerified,
            isVerified: isVerified,
          });
        }

        if (data && data?.data?.token) {
          const { token } = data?.data;
          set({
            user: data?.data,
            token,
          });
        }
        return { data, error, isVerified };
      },

      forgotPassword: async (forgotPasswordFormData: ResetPasswordFormProps) => {
        const { data, error }: { data: ResetPasswordResponseProps; error: any } = await handleApiRequest(
          apiEndpoints.auth.forgotpassword,
          "post",
          {
            data: forgotPasswordFormData,
            toastError: true,
            toastSuccess: true,
          }
        );
        return { data, error };
      },

      setPassword: async (setPasswordFormData: SetPasswordFormProps) => {
        const { data, error }: { data: SetPasswordResponseProps; error: any } = await handleApiRequest(
          apiEndpoints.auth.setpassword,
          "post",
          {
            data: setPasswordFormData,
            toastError: true,
            toastSuccess: true,
          }
        );
        return { data, error };
      },

      changePassword: async (changePasswordFormData: ChangePasswordFormProps) => {
        const { data, error }: { data: ChangePasswordResponseProps; error: any } = await handleApiRequest(
          apiEndpoints.auth.setpassword,
          "post",
          {
            data: changePasswordFormData,
            toastError: true,
            toastSuccess: true,
          }
        );
        get().logout();
        return { data, error };
      },
      logout: async () => {
        set({
          user: null,
          token: null,
          isVerified: false,
          isAuthenticated: false,
          guestData: null,
          isGuestAuthenticated: false,
          guestToken: null,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
