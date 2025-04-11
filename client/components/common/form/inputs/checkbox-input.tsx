import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@mui/material";

interface CheckboxInputProps {
  name?: string;
  checkBoxLabel?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  inputBoxClassName?: string;
  onClick?: () => void;
  onChange?: (checked: boolean) => void;
}

export const CheckboxInput = ({
  name,
  checkBoxLabel,
  checked = false,
  disabled = false,
  className = "",
  inputBoxClassName = "",
  onClick,
  onChange,
}: CheckboxInputProps) => {
  const isFormContext = useFormContext();

  if (isFormContext) {
    const {
      control,
      formState: { errors },
    } = isFormContext;
    return (
      <div className="flex items-center flex-col">
        <div>
          <Controller
            name={name!}
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  {...field}
                  disabled={disabled}
                  onClick={onClick}
                  className={`p-0 !rounded-sm !p-0  ${inputBoxClassName ? inputBoxClassName : "form-checkbox h-5 w-5 text-[#202020]"}`}
                />
                {checkBoxLabel && <span className="ml-2 text-gray-800">{checkBoxLabel}</span>}
              </>
            )}
          />
        </div>
        {errors[name!] && <p className="text-red-500 text-sm">{(errors as any)[name!].message}</p>}
      </div>
    );
  } else {
    return (
      <div className="flex items-center flex-col">
        <div>
          <Checkbox
            checked={checked}
            disabled={disabled}
            onClick={onClick}
            onChange={(e) => {
              onChange && onChange(e.target.checked);
            }}
            className={`p-0 !rounded-sm !p-0  ${inputBoxClassName ? inputBoxClassName : "form-checkbox h-5 w-5 text-[#202020]"}`}
          />
          {checkBoxLabel && <span className="ml-2 text-gray-800">{checkBoxLabel}</span>}
        </div>
      </div>
    );
  }
};
