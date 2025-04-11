"use client";

import { useForm, FormProvider, DefaultValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { handleApiErrorMessage } from "@/config/setup/wrapper/api-wrapper";

interface FormWrapperProps<T> {
  defaultValues: T;
  validationSchema?: yup.ObjectSchema<any>;
  onSubmit: (data: T) => Promise<void> | void;
  children: React.ReactNode;
  className?: string;
  showError?: boolean;
}

export const FormWrapper = <T extends Record<string, any>>({
  defaultValues,
  validationSchema,
  onSubmit,
  children,
  className,
  showError = true,
}: FormWrapperProps<T>) => {
  const methods = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    resolver: yupResolver(validationSchema ?? yup.object().shape({})),
    mode: "all",
  });

  const [localError, setLocalError] = useState<string | null>(null);

  const handleErrorMessage = (err: any) => {
    const { errorMsg } = handleApiErrorMessage(err);

    setLocalError(errorMsg);
  };

  const handleFormSubmit = async (data: T) => {
    try {
      setLocalError(null);
      await onSubmit(data);
      methods.reset(defaultValues);
    } catch (submitError: any) {
      handleErrorMessage(submitError);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={className} noValidate>
        {children}
        {localError && showError && <div className="text-red-500 mt-2">{localError?.split(",")[0]}</div>}
      </form>
    </FormProvider>
  );
};
