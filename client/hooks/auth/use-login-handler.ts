import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginFormProps } from "../../types/store/auth-types";
import { useAuthStore } from "../../store/auth/auth-store";
import { WEBSITE_ROUTES } from "../../config/website/routes";

export const useLogin = (isCheckout?: boolean) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [otpProps, setOtpProps] = useState<any>({});
  const router = useRouter();

  const initialValues: LoginFormProps = {
    username: "",
    password: "",
  };

  const handleLoginFormSubmit = async (values: any) => {
    const loginData: LoginFormProps = {
      username: values.username,
      password: values.password,
    };
    console.log("LoginDataLoginData", values);
    setIsSubmitting(true);
    const { data, error, isVerified } = await useAuthStore.getState().login(loginData);

    console.log("data", isVerified);

    if (error) {
      setIsSubmitting(false);
      throw error;
    }

    if (data && data.data) {
      if (isVerified) {
        setIsLoggedIn(true);
        router.push(WEBSITE_ROUTES.pages.home);
      } else {
        setOtpProps(data?.data);
        setShowOtpField(true);
      }
    }
    setIsSubmitting(false);
  };

  return { initialValues, handleLoginFormSubmit, isSubmitting, showOtpField, otpProps, isLoggedIn };
};
