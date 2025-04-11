"use client";

import LoginForm from "../../../../components/auth/login-form";
import AuthWrapper from "../../../../components/auth/wrapper/auth-wrapper";

export default function LoginPage() {
  return (
    <AuthWrapper title="Login">
      <LoginForm />
    </AuthWrapper>
  );
}
