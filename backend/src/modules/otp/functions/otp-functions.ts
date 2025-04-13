export const generateOtp = async (length = 4): Promise<{
    otp: string;
    otpExpiry: Date,
}> => {
    if (length <= 0) {
        throw new Error('Length must be a positive integer.');
    }

    const currentDate = new Date();
    const otpExpiry = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);

    let otp = '';
    for (let i = 0; i < length; i++) {
        const digit = Math.floor(Math.random() * 10);
        otp += digit.toString();
    }

    return { otp, otpExpiry };
};
