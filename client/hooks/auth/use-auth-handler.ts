import { WEBSITE_ROUTES } from "@/config/website/routes";
import { useAuthStore } from "@/store/auth/auth-store";
import { ChangePasswordFormProps } from "@/types/store/auth-types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAuthHandler = () => {
  const router = useRouter();
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    if (user) {
      await logout();
      router.push(WEBSITE_ROUTES.auth.login);
    } else {
      router.push(WEBSITE_ROUTES.auth.login);
    }
  };

  const initialChangePasswordValues = useState({
    email: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChangePassword = async (changePasswordData: ChangePasswordFormProps) => {
    await useAuthStore.getState().changePassword(changePasswordData);
  };

  return { initialChangePasswordValues, handleChangePassword, handleLogout, user };
};
