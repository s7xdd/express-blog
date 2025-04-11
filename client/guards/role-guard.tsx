"use client";

import { WEBSITE_ROUTES } from "@/config/website/routes";
import { useAuthStore } from "@/store/auth/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function withRoleGuard<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredRole: string
) {
  const RoleGuard: React.FC<P> = (props) => {
    const isAuthenticated = useAuthStore((state) => state.user !== null);
    const userRole = useAuthStore((state) => state.userRole);
    const token = useAuthStore((state) => state.token);
    const router = useRouter();

    console.log("userRole", userRole);

    // useEffect(() => {
    //   if (!isAuthenticated) {
    //     router.push(WEBSITE_ROUTES.auth.login);
    //   } 
    // }, [isAuthenticated]);

 

    return <WrappedComponent {...props} />;
  };

  return RoleGuard;
}

export default withRoleGuard;
