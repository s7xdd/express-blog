import React from "react";
import { useFormContext } from "react-hook-form";
import {
  AutocompleteInput,
  CheckboxInput,
  FileInput,
  QuillEditorInput,
  SelectInput,
  SwitchInput,
  TextInput,
} from "../inputs";

interface FormInputProps {
  name: string;
  label?: string;
  checkBoxLabel?: string;
  type?:
    | "text"
    | "textarea"
    | "email"
    | "password"
    | "number"
    | "select"
    | "checkbox"
    | "autocomplete"
    | "quill"
    | "group"
    | "file"
    | "repeatable"
    | "switch";
  placeholder?: string;
  disabled?: boolean;
  size?: "small" | "medium";
  className?: string;
  requireExternalLabel?: boolean;
  options?: { value: string; label: string }[];
  onChange?: any;
  onClick?: () => void;
  divClassName?: string;
  inputBoxClassName?: string;
  labelClassName?: string;
  accept?: {
    "image/*": [".jpeg", ".png", ".jpg", ".gif"];
    "*/*": [".pdf", ".docx"];
  };
  [key: string]: any;
}

export const FormInput = ({
  name,
  label,
  checkBoxLabel,
  type = "text",
  disabled = false,
  size = "small",
  onClick,
  placeholder = "",
  className = "",
  labelClassName = "",
  divClassName = "",
  requireExternalLabel = false,
  inputBoxClassName = "",
  options = [],
  onChange,
  accept = {
    "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    "*/*": [".pdf", ".docx"],
  },
  defaultValues,
  ...props
}: FormInputProps) => {
  const {
    register,
    control,
    formState: { errors },
    clearErrors,
    setValue,
  } = useFormContext();

  if (props.type === "custom") {
    return props.render(props.value);
  }

  console.log("props.defaultValuesprops.defaultValuesprops.defaultValues",props.defaultValues)

  return (
    <div className={`flex flex-col ${className}`}>
      {label && requireExternalLabel && (
        <label className={labelClassName || "mb-2 font-medium text-gray-800"}>{label}</label>
      )}

      {type === "file" ? (
        <FileInput
          name={name}
          accept={accept}
          disabled={disabled}
          className={divClassName}
          inputBoxClassName={inputBoxClassName}
          onChange={(files) => setValue(name, files)}
          defaultValues={defaultValues}
          clearErrors={clearErrors}
        />
      ) : type === "autocomplete" ? (
        <AutocompleteInput
          name={name}
          options={options}
          placeholder={placeholder}
          disabled={disabled}
          size={size}
          className={divClassName}
          inputBoxClassName={inputBoxClassName}
          onChange={(value) => {
            clearErrors && clearErrors(name);
            onChange && onChange(value);
          }}
        />
      ) : type === "checkbox" ? (
        <CheckboxInput
          name={name}
          checkBoxLabel={checkBoxLabel}
          disabled={disabled}
          className={divClassName}
          inputBoxClassName={inputBoxClassName}
          onClick={onClick}
          onChange={(checked) => {
            clearErrors && clearErrors(name);
            onChange && onChange(checked);
          }}
        />
      ) : type === "switch" ? (
        <SwitchInput
          name={name}
          label={label}
          disabled={disabled}
          className={divClassName}
          inputBoxClassName={inputBoxClassName}
          onChange={(checked) => {
            clearErrors && clearErrors(name);
            onChange(checked);
          }}
        />
      ) : type === "select" ? (
        <SelectInput
          name={name}
          label={label}
          options={options}
          disabled={disabled}
          size={size}
          className={divClassName}
          inputBoxClassName={inputBoxClassName}
          onChange={(e) => {
            clearErrors && clearErrors(name);
            onChange && onChange(e);
          }}
        />
      ) : type === "quill" ? (
        <QuillEditorInput
          name={name}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          className={divClassName}
          inputBoxClassName={inputBoxClassName}
          onChange={(value) => {
            clearErrors && clearErrors(name);
            onChange && onChange && onChange(value);
          }}
        />
      ) : (
        <TextInput
          name={name}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          size={size}
          type={type}
          className={divClassName}
          inputBoxClassName={inputBoxClassName}
          requireExternalLabel={requireExternalLabel}
          onChange={(e) => {
            clearErrors && clearErrors(name);
            onChange && onChange(e);
          }}
        />
      )}
    </div>
  );
};
