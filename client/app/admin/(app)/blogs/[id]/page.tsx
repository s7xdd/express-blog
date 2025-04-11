"use client";

import React, { useEffect } from "react";
import {
  ProductFormDefaultValues,
  ProductFormFields,
} from "../../../../../utils/modules/form-structures/product-form-structure";
import RenderEditDataForm from "../../../../../components/common/form/render-edit-form";
import { ProductValidationSchema } from "../../../../../utils/validators/admin/ecommerce/product-schema";
import { useProducts } from "../../../../../hooks/blogs/use-blogs";

const ProductDetailPage = () => {
  const { triggerAllItemsList: triggerCategoriesList, allItemsList: allCategories } = useCategories();

  useEffect(() => {
    triggerCategoriesList();
  }, []);

  const productForm = ProductFormFields({ brands: allBrands, categories: allCategories });

  return (
    <RenderEditDataForm
      title="Product Details"
      editTitle="Edit Product"
      dataHook={useProducts}
      formFields={productForm}
      validationSchema={ProductValidationSchema}
      defaultValues={ProductFormDefaultValues}
    />
  );
};

export default ProductDetailPage;
