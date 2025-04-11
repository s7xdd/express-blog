"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { FormWrapper } from "../wrapper/form-wrapper";
import { FormInput } from "../components/form-input";
import Button from "../../button/button";
import { DynamicFormProps, DynamicFormSectionProps } from "../../../../types/components/component-types";

const GroupField = ({
  field,
  parentKey,
  renderFields,
  extraProps,
}: {
  field: DynamicFormSectionProps["fields"][number];
  parentKey: string;
  renderFields: (fields: DynamicFormSectionProps["fields"], parentKey?: string) => any[];
  extraProps: any;
}) => {
  const { control } = useFormContext();
  const groupName = field?.name || `${parentKey}-${field?.title?.replace(/\s+/g, "").toLowerCase()}`;
  const isDisabled = extraProps?.isDisabled;

  const {
    fields: groupItems,
    append,
    remove,
  } = useFieldArray({
    control,
    name: groupName,
  });

  return (
    <div className={`border border-gray-200 p-4 rounded-md ${field?.className || ""}`}>
      <h3 className="text-lg font-medium mb-2 text-gray-600">{field?.label}</h3>
      {groupItems.map((_, index) => {
        const key = `${parentKey}-${field?.name}-${index}`;
        const updatedNestedFields = field?.nestedFields?.map((nestedField) => ({
          ...nestedField,
          name: `${field?.name}[${index}].${nestedField?.name}`,
          disabled: isDisabled,
        }));
        return (
          <div key={key} className="group-item mb-4 border border-gray-300 p-2 rounded relative">
            <div
              className={`${field.requireIndex ? "absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center" : null}`}
            >
              {field.requireIndex ? index + 1 : null}
            </div>
            <div className={`p-3 mt-5 grid grid-cols-1 md:grid-cols-${field?.grids ?? 2} gap-4`}>
              {updatedNestedFields && renderFields(updatedNestedFields, key)}
            </div>
            {!isDisabled && field?.showRemoveButton && (
              <div className="flex justify-end py-3">
                <Button type="button" onClick={() => remove(index)} className="text-red-500 !bg-red-400 mt-2">
                  Remove {field?.label}
                </Button>
              </div>
            )}
          </div>
        );
      })}
      {!isDisabled && field?.showAddButton && (
        <Button type="button" onClick={() => append({})} className="mt-2 px-4 py-2 text-white rounded text-nowrap">
          Add {field?.label}
        </Button>
      )}
    </div>
  );
};

const DynamicForm = ({
  sections,
  defaultValues = {},
  validationSchema,
  onSubmit,
  className,
  isLoading,
  isDisabled = false,
  showSubmitButton = true,
  ...props
}: DynamicFormProps & { isDisabled?: boolean; showSubmitButton?: boolean }) => {
  const renderFields = (fields: DynamicFormSectionProps["fields"], parentKey = "") => {
    return fields.map((field, index) => {
      const key = `${parentKey}-${field?.name}-${index}`;
      const fieldWithDisabled = {
        ...field,
        disabled: isDisabled,
      };

      if (field?.type === "group") {
        if (field?.allowMultiple) {
          return (
            <GroupField
              key={key}
              field={fieldWithDisabled}
              parentKey={key}
              renderFields={renderFields}
              extraProps={{ ...props, isDisabled }}
            />
          );
        } else {
          return (
            <div key={key} className={`border border-gray-200 p-4 rounded-md ${field?.className || ""}`}>
              <h3 className="text-lg font-medium mb-2 text-gray-600">{field?.label}</h3>
              <div className={`grid grid-cols-1 md:grid-cols-${field?.grids ?? 2} gap-4`}>
                {field?.nestedFields &&
                  renderFields(
                    field?.nestedFields.map((nestedField) => ({
                      ...nestedField,
                      disabled: isDisabled,
                    })),
                    key
                  )}
              </div>
            </div>
          );
        }
      }

      return (
        <div key={key} className={field?.className || ""}>
          <FormInput {...fieldWithDisabled} {...props} defaultValues={defaultValues} />
        </div>
      );
    });
  };

  return (
    <FormWrapper<Record<string, any>>
      defaultValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      className={className}
    >
      {sections.map((section, index) => (
        <div key={index} className={`mb-8 border border-gray-300 p-4 rounded-md ${section?.className || ""}`}>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">{section?.title}</h2>
          {section?.description && <p className="text-gray-500 mb-6">{section?.description}</p>}
          <div className={`grid grid-cols-1 md:grid-cols-${section?.grids ?? 2} gap-4`}>
            {renderFields(section?.fields)}
          </div>
        </div>
      ))}

      {showSubmitButton ? (
        <Button isLoading={isLoading} type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </Button>
      ) : null}
    </FormWrapper>
  );
};

export default DynamicForm;
