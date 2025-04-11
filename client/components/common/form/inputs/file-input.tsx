import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import FileUpload from "../components/file-upload";

interface FileInputProps {
  name: string;
  accept?: {
    "image/*": [".jpeg", ".png", ".jpg", ".gif"];
    "*/*": [".pdf", ".docx"];
  };
  disabled?: boolean;
  className?: string;
  inputBoxClassName?: string;
  onChange?: (files: File[]) => void;
  clearErrors: (name: string) => void;
  type?: string;
  setValue?: (name: string, value: File[]) => void;
  errors?: any;
  defaultValues?: any;
}

export const FileInput = ({
  name,
  accept = {
    "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    "*/*": [".pdf", ".docx"],
  },
  disabled = false,
  className = "",
  inputBoxClassName = "",
  onChange,
  clearErrors,
  type = "file",
  setValue,
  errors,
  defaultValues,
}: FileInputProps) => {
  const isFormContext = useFormContext();

  console.log("defaultValuesdefaultValues",defaultValues)

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
          <FileUpload
            accept={accept}
            errors={errors}
            type={type}
            name={field.name}
            clearErrors={clearErrors}
            onChange={(files) => {
              setValue && setValue(name!, files);
              onChange && onChange(files);
            }}
            initialFiles={defaultValues && defaultValues[name] ? defaultValues[name] : []}
          />
        )}
      />
    );
  } else {
    return (
      <FileUpload
        accept={accept}
        errors={errors}
        type={type}
        name={name}
        clearErrors={clearErrors}
        onChange={(files) => {
          setValue && setValue(name!, files);
          onChange && onChange(files);
        }}
        initialFiles={defaultValues && defaultValues[name] ? defaultValues[name] : []}
      />
    );
  }
};
