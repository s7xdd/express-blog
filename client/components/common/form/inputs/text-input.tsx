import React from "react";
import { useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

interface TextInputProps {
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: "small" | "medium";
  className?: string;
  inputBoxClassName?: string;
  requireExternalLabel?: boolean;
  type?: string;
  onClick?: () => void;
  onChange?: (e: any) => void;
  clearErrors?: (name: string) => void;
}

export const TextInput = ({
  name,
  label,
  value = "",
  placeholder = "",
  disabled = false,
  size = "small",
  className = "",
  inputBoxClassName = "",
  requireExternalLabel = false,
  type,
  onClick,
  onChange,
  clearErrors,
}: TextInputProps) => {
  const isFormContext = useFormContext();

  if (isFormContext) {
    const {
      register,
      formState: { errors },
    } = isFormContext;

    return (
      <TextField
        fullWidth
        type={type}
        label={!requireExternalLabel ? label : ""}
        disabled={disabled}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 1,
          },
        }}
        error={!!errors[name!]}
        helperText={errors[name!]?.message as string}
        {...register(name!)}
        InputProps={{
          className: "bg-white",
        }}
        size={size}
        onClick={onClick}
        onChange={onChange}
        className={` !rounded-sm !p-0  ${inputBoxClassName ? inputBoxClassName : "w-full"}"`}
      />
    );
  } else {
    return (
      <TextField
        fullWidth
        type={type}
        label={label}
        disabled={disabled}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 1,
          },
        }}
        InputProps={{
          className: "bg-white",
        }}
        size={size}
        onClick={onClick}
        value={value}
        onChange={onChange}
        className={` !rounded-sm !p-0  ${inputBoxClassName ? inputBoxClassName : "w-full"}"`}
      />
    );
  }
};
