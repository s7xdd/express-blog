
import { checkPermissionBlock, comparePasswords, } from "../../../functions/auth-functions";
import { PERMISSION_BLOCKS } from "../../../constants/auth-constants";
import { generateJwt } from "../../../functions/jwt-functions";
import { handleUserExistence } from "../../../../../shared/utils/helper/common-functions";


export const adminAuthService = {
    async login(username: string, password: string) {
        try {
            const { user }: { user: any } = await handleUserExistence({ username: username, throwNoUserExistsError: true });

            const isPasswordValid = await comparePasswords({
                plainPassword: password,
                hashedPassword: user.password,
            });

            if (!isPasswordValid) {
                throw new Error("Invalid credentials");
            }

            if (checkPermissionBlock({ userDetails: user, requiredPermission: PERMISSION_BLOCKS.admin })) {
                const token = generateJwt(user)

                const data = {
                    token,
                    user
                }

                return data;
            }

            throw new Error("Unauthorized");

        } catch (err) {
            throw err;
        }

    }
};

