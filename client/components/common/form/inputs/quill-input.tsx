import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactQuillEditor from "../../text-editor/react-quil";

interface QuillEditorInputProps {
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputBoxClassName?: string;
  divClassName?: string;
  labelClassName?: string;
  onChange?: (value: string) => void;
  clearErrors?: any;
}

export const QuillEditorInput = ({
  name,
  label,
  value = "",
  placeholder = "",
  disabled = false,
  className = "",
  inputBoxClassName = "",
  labelClassName = "",
  divClassName = "",
  onChange,
  clearErrors,
}: QuillEditorInputProps) => {
  const isFormContext = useFormContext();

  if (isFormContext) {
    const {
      control,
      formState: { errors },
    } = isFormContext;

    return (
      <div className={divClassName}>
        {label && <label className={`${labelClassName}`}>{label}</label>}
        <Controller
          name={name!}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ReactQuillEditor
              value={field.value || ""}
              onChange={(newValue) => {
                field.onChange(newValue);
                clearErrors && clearErrors(name!);
                onChange && onChange(newValue);
              }}
              placeholder={placeholder}
              className={inputBoxClassName}
            />
          )}
        />
        {errors[name!] && <p className="text-red-500 text-sm">{(errors as any)[name!].message}</p>}
      </div>
    );
  } else {
    return (
      <div className={divClassName}>
        {label && <label className={`${labelClassName}`}>{label}</label>}
        <ReactQuillEditor
          value={value}
          onChange={(newValue) => {
            onChange && onChange(newValue);
          }}
          placeholder={placeholder}
          className={inputBoxClassName}
        />
      </div>
    );
  }
};
