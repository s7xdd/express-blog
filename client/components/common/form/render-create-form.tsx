"use client";

import React from "react";
import ComponentWrapper from "../wrapper/component-wrapper";
import DynamicForm from "./form-render/dynamic-form";

const RenderCreateForm = ({
  title,
  dataHook,
  formFields,
  validationSchema,
  defaultValues,
  transformSubmitData = (data) => data,
  additionalProps = {},
}) => {
  const { updateItemHandler, isSubmitting } = dataHook();

  const handleSubmit = async (data) => {
    const transformedData = transformSubmitData(data);
    await updateItemHandler(transformedData);
  };

  return (
    <ComponentWrapper title={title} enableBreadcrumbs {...additionalProps}>
      <DynamicForm
        sections={formFields}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        isLoading={isSubmitting}
      />
    </ComponentWrapper>
  );
};

export default RenderCreateForm;
