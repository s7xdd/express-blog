"use client";

import React, { useEffect } from "react";
import {
  ProductFormDefaultValues,
  ProductFormFields,
} from "../../../../../utils/modules/form-structures/product-form-structure";
import RenderCreateForm from "../../../../../components/common/form/render-create-form";
import { ProductValidationSchema } from "../../../../../utils/validators/admin/ecommerce/product-schema";

const CreateProductPage = () => {
  useEffect(() => {}, []);

  const productForm = ProductFormFields({});

  return (
    <RenderCreateForm
      title="Create Product"
      dataHook={useProducts}
      formFields={productForm}
      validationSchema={ProductValidationSchema}
      defaultValues={ProductFormDefaultValues}
    />
  );
};

export default CreateProductPage;
