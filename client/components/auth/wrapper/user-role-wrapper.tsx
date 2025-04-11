"use client";
import React from "react";
import { useAuthStore } from "../../../store/auth/auth-store";

interface UserRoleWrapperProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const UserRoleWrapper: React.FC<UserRoleWrapperProps> = ({ allowedRoles, children }) => {
  const { userRole } = useAuthStore.getState();

  if (userRole && allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }

  return null;
};

export default UserRoleWrapper;
