import { WEBSITE_ROUTES } from "../../config/website/routes";
import { UserProps } from "../../types/store/auth-types";

export function isUserVerified(user: UserProps) {
    if (!user) return false;

      if(user && user?.issocialmedia){
        return true
      }

    if (typeof user.isverified !== "undefined") {
        return user.isverified;
    }

    return false;
}

export function getAuthRedirectionLink(
    user: UserProps | null,
    protectedLink: string,
    redirectionLink?: string,
): string {
    if (!user) {
        return WEBSITE_ROUTES.auth.login;
    }

    if (isUserVerified(user)) {
        return protectedLink;
    }

    return redirectionLink ? redirectionLink : WEBSITE_ROUTES.auth.login;
}
