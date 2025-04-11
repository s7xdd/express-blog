import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";

interface SelectInputProps {
  name?: string;
  label?: string;
  value?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  size?: "small" | "medium";
  className?: string;
  inputBoxClassName?: string;
  onChange?: (e: React.ChangeEvent<{ value: unknown }>) => void;
  sx?: any;
}

export const SelectInput = ({
  name,
  label,
  value = "",
  options,
  disabled = false,
  size = "small",
  className = "",
  inputBoxClassName = "",
  onChange,
  sx,
}: SelectInputProps) => {
  const isFormContext = useFormContext();

  if (isFormContext) {
    const {
      register,
      formState: { errors },
    } = isFormContext;

    return (
      <TextField
        select
        fullWidth
        label={label}
        disabled={disabled}
        error={!!errors[name!]}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 1,
          },
          sx,
        }}
        InputProps={{
          className: "bg-white",
        }}
        helperText={errors[name!]?.message as string}
        {...register(name!)}
        size={size}
        onChange={onChange}
        className={`!rounded-sm !p-0  ${inputBoxClassName ? inputBoxClassName : "w-full border border-gray-300"}`}
      >
        <MenuItem value="">Select {label?.toLowerCase()}</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  } else {
    return (
      <TextField
        select
        fullWidth
        label={label}
        disabled={disabled}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 1,
          },
          sx,
        }}
        InputProps={{
          className: "bg-white",
        }}
        value={value}
        size={size}
        onChange={onChange}
        className={`!rounded-sm !p-0  ${inputBoxClassName ? inputBoxClassName : "w-full border border-gray-300"}`}
      >
        <MenuItem value="">Select {label?.toLowerCase()}</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
};
