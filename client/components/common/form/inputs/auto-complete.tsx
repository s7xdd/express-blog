import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

interface AutocompleteInputProps {
  name?: string;
  options: { value: string; label: string }[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: "small" | "medium";
  className?: string;
  inputBoxClassName?: string;
  onChange?: (value: any) => void;
  clearErrors?: any;
}

export const AutocompleteInput = ({
  name,
  options,
  value = "",
  placeholder = "",
  disabled = false,
  size = "small",
  className = "",
  inputBoxClassName = "",
  onChange,
  clearErrors,
}: AutocompleteInputProps) => {
  const isFormContext = useFormContext();

  if (isFormContext) {
    const {
      control,
      formState: { errors },
    } = isFormContext;

    return (
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label}
            size={size}
            value={options.find((option) => option.value === field.value)}
            onChange={onChange}
            disableClearable
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={placeholder}
                InputProps={{
                  className: "bg-white",
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                  },
                }}
                disabled={disabled}
                error={!!errors[name!]}
                helperText={errors[name!]?.message as string}
                className={`!px-0 !rounded-sm !p-0  ${inputBoxClassName ? inputBoxClassName : "w-full border border-gray-300"}"`}
              />
            )}
          />
        )}
      />
    );
  } else {
    return (
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        size={size}
        value={options.find((option) => option.value === value)}
        onChange={(_, value) => {
          onChange && onChange(value);
        }}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            InputProps={{
              className: "bg-white",
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
              },
            }}
            disabled={disabled}
            className={`!px-0 !rounded-sm !p-0  ${inputBoxClassName ? inputBoxClassName : "w-full border border-gray-300"}"`}
          />
        )}
      />
    );
  }
};
