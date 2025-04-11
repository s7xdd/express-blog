"use client";
import { ReactNode } from "react";
import React from "react";
import MuiButton, { ButtonProps } from "@mui/material/Button";

import Link from "next/link";
import Loading from "./loading";
import cn from "../../../utils/class-names";

interface ButtonPropsWithIcons extends ButtonProps {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  width?: number;
  className?: any;
  height?: number;
  radius?: number;
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  isLoadingColor?: string;
  loadingSize?: string;
  borderRadius?: boolean;
  variant?: "text" | "contained" | "outlined";
}

const Button: React.FC<ButtonPropsWithIcons> = ({
  children,
  startIcon,
  endIcon,
  className = "",
  width,
  height,
  size = "small",
  isLoading = false,
  variant = "contained",
  isLoadingColor = "#ffffff",
  loadingSize = 14,
  borderRadius = true,
  radius = 4,
  style,
  sx,
  ...props
}) => {
  return (
    <MuiButton
      {...props}
      className={cn("hover:bg-black text-[ui]", className)}
      startIcon={startIcon}
      endIcon={endIcon}
      size={size}
      LinkComponent={Link}
      variant={variant}
      style={{
        textTransform: "none",
        borderRadius: borderRadius ? radius : 0,
        width: width,
        height: height,
        ...style,
      }}
      sx={{
        ...sx,
        fontFamily: "inherit",
        fontWeight: "normal",
        fontSize: "16px",
        textTransform: "none",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      }}
      disabled={isLoading || props.disabled}
    >
      <div className="flex items-center gap-1">
        {isLoading && <Loading className={`${isLoadingColor} mr-2 `} size={Number(loadingSize)} />}
        {children}
      </div>
    </MuiButton>
  );
};

export default Button;
