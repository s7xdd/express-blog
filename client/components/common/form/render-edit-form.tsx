"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { prepareSubmission } from "../../../utils/helper/common";
import ComponentWrapper from "../wrapper/component-wrapper";
import DynamicForm from "./form-render/dynamic-form";

const RenderEditDataForm = ({
  title,
  editTitle,
  dataHook,
  formFields,
  validationSchema,
  defaultValues,
  transformSubmitData = (data) => prepareSubmission(data),
}) => {
  const [formKey, setFormKey] = React.useState(0);
  const params = useParams();
  const itemId = params?.id;

  const {
    triggerAllItemsList,
    updateItemHandler,
    isSubmitting,
    isEditing,
    fetchItemWithId,
    handleEditCancel,
    toggleEditMode,
    itemData,
  } = dataHook();

  useEffect(() => {
    triggerAllItemsList();
    if (itemId) {
      fetchItemWithId(itemId);
    }
  }, [itemId]);

  useEffect(() => {
    if (itemData) {
      setFormKey((prevKey) => prevKey + 1);
    }
  }, [itemData]);

  const handleSubmit = async (data) => {
    const newData = transformSubmitData(data);
    console.log("submitted", data);
    await updateItemHandler(newData, itemId);
  };

  return (
    <ComponentWrapper
      title={isEditing ? editTitle : title}
      enableBreadcrumbs
      enableRightButton
      rightButtonText={isEditing ? "Cancel" : "Edit"}
      rightButtonProps={{
        onClick: isEditing ? handleEditCancel : toggleEditMode,
        variant: "outlined",
        className: isEditing ? "bg-gray-500 text-white" : "bg-blue-500 text-white",
      }}
    >
      <DynamicForm
        key={formKey}
        sections={formFields}
        validationSchema={isEditing ? validationSchema : undefined}
        onSubmit={handleSubmit}
        defaultValues={itemData || defaultValues}
        isLoading={isSubmitting}
        isDisabled={!isEditing}
        showSubmitButton={isEditing}
      />
    </ComponentWrapper>
  );
};

export default RenderEditDataForm;
