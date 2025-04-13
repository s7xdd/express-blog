import { UserProps } from "../../auth/types/auth-types";
import { generateOtp } from "../functions/otp-functions";

export const otpServices = {
    async generateOtp(length = 4): Promise<{
        otp: string;
        otpExpiry: Date,
    }> {
        const otp = generateOtp(length);

        return otp;
    },
    async validateOtp({ userData, inputOtp }: { userData: UserProps, inputOtp: string }): Promise<boolean> {

        if (!(userData.otp) || new Date() > userData.otp_expiry) {
            return false; // OTP expired or invalid
        }

        if (userData.otp !== inputOtp) {
            return false; // Invalid OTP
        }

        return true;
    },

};

