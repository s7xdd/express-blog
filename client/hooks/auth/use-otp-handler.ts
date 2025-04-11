import { apiEndpoints } from "@/config/setup/api-setup/api-endpoints";
import { handleApiRequest } from "@/config/setup/wrapper/api-wrapper";
import { WEBSITE_ROUTES } from "@/config/website/routes";
import { useAuthStore } from "@/store/auth/auth-store";
import { OTPFormProps, ResendOTPFormProps, ResetPasswordFormProps, SetPasswordFormProps } from "@/types/store/auth-types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useOTP = ({ otpProps, isGuest = false }: { otpProps: OTPFormProps; isGuest?: boolean }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResendingOtp, setResendingOtp] = useState(false);
    const [showOtpField, setShowOtpField] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isActive, setIsActive] = useState(false);

    const router = useRouter();

    const initialValues: OTPFormProps = {
        ...otpProps,
        otp: "",
        email: otpProps.email,
        username: otpProps.username,
    };

    const forgotPasswordInitialValues: SetPasswordFormProps = {
        email: otpProps.email,
        password: "",
        confirmpassword: "",
        code: "",
    };

    useEffect(() => {
        let timerId: any;
        if (isActive && timeLeft > 0) {
            timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }

        return () => clearInterval(timerId);
    }, [isActive, timeLeft]);

    const handleResendOTP = async () => {
        setResendingOtp(true);

        const resendOtpData: ResendOTPFormProps = {
            username: otpProps.username,
            email: otpProps.email,
        };
        await handleApiRequest(apiEndpoints.auth.resendotp, 'post', {
            data: resendOtpData,
            toastSuccess: true,
            toastError: true
        });
        setIsActive(true);
        setResendingOtp(false);
    };

    const handleOTPSubmit = async (OTPData: OTPFormProps) => {
        setIsSubmitting(true);

        const { data, error, isVerified } = await useAuthStore.getState().verifyOTP(OTPData);

        if (data && data.user) {
            if (isVerified && !data?.user?.isguest) {
                router.push(WEBSITE_ROUTES.pages.home);
            } else {
                setShowOtpField(true);
            }
        } else if (error) {
            console.error(error?.message);
        }

        setIsSubmitting(false);
    };

    const handleForgotPassword = async (ForgotPasswordData: ResetPasswordFormProps) => {
        setIsSubmitting(true);

        const { data, error } = await useAuthStore.getState().forgotPassword(ForgotPasswordData);

        if (data && data.message) {
            setShowOtpField(true);
        }

        setIsSubmitting(false);
    };

    const handleSetPassword = async (SetPasswordData: SetPasswordFormProps) => {
        setIsSubmitting(true);
        const { data, error } = await useAuthStore.getState().setPassword(SetPasswordData);

        if (data && data.success) {
            router.push(WEBSITE_ROUTES.auth.login);
        }
    };


    return {
        initialValues,
        forgotPasswordInitialValues,
        handleOTPSubmit,
        handleForgotPassword,
        handleSetPassword,
        isSubmitting,
        showOtpField,
        handleResendOTP,
        timeLeft,
        isActive,
        isResendingOtp,
    };
};
