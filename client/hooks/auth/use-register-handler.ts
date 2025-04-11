import { apiEndpoints } from "@/config/setup/api-setup/api-endpoints";
import { handleApiRequest } from "@/config/setup/wrapper/api-wrapper";
import { RegisterFormProps, RegisterResponseProps } from "@/types/store/auth-types";
import { useState } from "react";

export const useRegisterHandler = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showOtpField, setShowOtpField] = useState(false);
    const [otpProps, setOtpProps] = useState<any>({});

    const initialRegisterValues: RegisterFormProps = {
        username: "",
        password: "",
        confirmpassword: "",
        email: "",
        agreetermsandconditions: false,
    };

    const handleRegisterFormSubmit = async (RegisterData: RegisterFormProps) => {
        setIsSubmitting(true);

        const formData = {
            email: RegisterData.email,
            password: RegisterData.password,
            confirmPassword: RegisterData.confirmpassword,
            aggreeWithTermsAndCondions: RegisterData.agreetermsandconditions,
        };

        const { data, error }: { data: RegisterResponseProps; error: any } = await handleApiRequest(
            apiEndpoints.auth.register,
            'post',
            {
                toastSuccess: true,
                toastError: true,
                data: formData
            }
        );

        if (data && data.success) {
            setOtpProps(data?.user);
            setShowOtpField(true);
        } else if (error) {
            console.error(error?.message);
            setIsSubmitting(false);

            throw error;
        }
        setIsSubmitting(false);
    };

    return { initialRegisterValues, handleRegisterFormSubmit, isSubmitting, showOtpField, otpProps };
};