"use client";

import { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
  title: string;
  subTitle?: string;
}

export default function AuthWrapper({ children, title = "Sign In to your Account", subTitle }: AuthWrapperProps) {
  return (
    <>
      <section className="bg-white dark:bg-dark-2 flex flex-wrap min-h-[100vh]">
        <div className="lg:w-1/2 lg:block hidden">
          <div className="flex items-center flex-col h-full justify-center">
            <img src="/auth-img.png" alt="" />
          </div>
        </div>
        <div className="lg:w-1/2 py-8 px-6 flex flex-col justify-center">
          <div className="lg:max-w-[464px] mx-auto w-full">
            <div>
              <a href="index.html" className="mb-2.5 max-w-[290px]">
                <img src="assets/images/logo.png" alt="" />
              </a>
              <h4 className="mb-3">{title}</h4>
              <p className="mb-8 text-secondary-light text-lg">{subTitle}</p>
            </div>
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
