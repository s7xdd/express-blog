import * as yup from "yup";

export interface HeaderConfig<T> {
  value: keyof T;
  label: string;
  hideFromSort?: boolean;
  format?: (item: T) => React.ReactNode;
}

export interface FilterProps {
  label: string;
  key: string;
  type: "text" | "number" | "select" | "date" | "autocomplete" | any;
  value?: any;
  onChange: (value: any) => void;
  options?: { value: any; label: string }[];
  fetchOptions?: (inputValue: string) => Promise<{ value: any; label: string }[]>;
  disabled?: boolean;
  minDate?: string | null;
}

interface FieldOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  name: string;
  label?: string;
  title?: string;
  grids?: number;
  showRemoveButton?: boolean;
  showAddButton?: boolean;
  requireIndex?: boolean;
  className?: string;
  divClassName?: string;
  inputBoxClassName?: string;
  labelClassName?: string;
  type: "text" | "number" | "select" | "checkbox" | "autocomplete" | "quill" | "file" | "group" | "switch" | "password" | "repeatable";
  requireExternalLabel?: boolean;
  placeholder?: string;
  allowMultiple?: boolean;
  options?: FieldOption[];
  validation?: yup.AnySchema;
  checkBoxLabel?: string;
  nestedFields?: FieldConfig[];
}

export interface DynamicFormSectionProps {
  title?: string;
  description?: string;
  type?: string;
  allowMultiple?: boolean;
  fields: FieldConfig[];
  className?: string;
  grids?: number;
}


export interface DynamicFormProps {
  sections: DynamicFormSectionProps[];
  defaultValues?: Record<string, any>;
  validationSchema?: yup.ObjectSchema<any>;
  onSubmit: (data: Record<string, any>) => void;
  className?: string;
  isLoading?: boolean;
}

