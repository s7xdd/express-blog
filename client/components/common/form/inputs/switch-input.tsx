import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Android12Switch } from "@/components/custom-styles/styles";

interface SwitchInputProps {
  name: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  inputBoxClassName?: string;
  onChange: any;
  clearErrors?: (name: string) => void;
}

export const SwitchInput = ({
  name,
  label,
  checked = false,
  disabled = false,
  className = "",
  inputBoxClassName = "",
  clearErrors,
  onChange,
}: SwitchInputProps) => {
  const isFormContext = useFormContext();

  if (isFormContext) {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    return (
      <div className="flex items-center">
        {label && <span className="mr-2 text-gray-800">{label}</span>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Android12Switch
              {...field}
              checked={field.value || false}
              disabled={disabled}
              onChange={onChange}
              color="primary"
              className={`${inputBoxClassName ? inputBoxClassName : ""}`}
              classes={{ root: "MuiTouchRipple-root" }}
            />
          )}
        />
      </div>
    );
  } else {
    return (
      <div className="flex items-center">
        {label && <span className="mr-2 text-gray-800">{label}</span>}
        <Android12Switch
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          color="primary"
          className={`${inputBoxClassName ? inputBoxClassName : ""}`}
          classes={{ root: "MuiTouchRipple-root" }}
        />
      </div>
    );
  }
};
