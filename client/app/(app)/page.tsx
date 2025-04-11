"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../../components/common/button/button";
import { WEBSITE_ROUTES } from "../../config/website/routes";
import { useAuthStore } from "../../store/auth/auth-store";

export default function Home() {
  const [form, setForm] = useState({ name: "", description: "" });

  const router = useRouter();

  const { logout, isAuthenticated, user } = useAuthStore();

  console.log("isAuthenticated", isAuthenticated);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {"Hello" + user?.email}
        {!isAuthenticated ? (
          <Button onClick={() => router.push(WEBSITE_ROUTES.auth.login)}>{"Login"}</Button>
        ) : (
          <Button
            onClick={() => {
              logout();
            }}
          >
            {"Logout"}
          </Button>
        )}
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      ></ul>
    </>
  );
}
