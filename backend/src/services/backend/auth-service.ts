
import { checkPermissionBlock, comparePasswords, handleUserExistence } from "../../utils/helper/auth/auth-functions";
import { PERMISSION_BLOCKS } from "../../utils/constants/admin/auth-constants";
import { generateJwt } from "../../utils/helper/jwt/jwt-functions";


export const AuthService = {
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

