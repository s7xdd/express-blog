import * as yup from "yup";

export const ProductValidationSchema = yup.object().shape({
  productTitle: yup.string().required("Product title is required"),
  description: yup.string().required("description is required"),
  longDescription: yup.string().required("Long description is required"),
  brand: yup.string().required("Brand is required"),
  unit: yup.string().required("Unit is required"),
  sku: yup.string().required("Sku is required"),
  productImageUrl: yup.string().required("Product image url is required"),
  productImage: yup.mixed().required("Product image is required"),
  galleryImage: yup.array().of(yup.string()).required("Gallery image is required"),
  variants: yup.array().of(
    yup.object().shape({
      countryId: yup.string().required("Country id is required"),
      productVariants: yup.array().of(
        yup.object().shape({
          variantSku: yup.string().required("Variant sku is required"),
          price: yup.number().positive("Price must be positive").required("Price is required"),
          extraProductTitle: yup.string().required("Extra product title is required"),
          // discountPrice: yup.number().positive("Discount price must be positive").required("Discount price is required"),
          quantity: yup.number().positive("Quantity must be positive").required("Quantity is required"),
          isDefault: yup.boolean().required("Is default is required"),
          variantDescription: yup.string().required("Variant description is required"),
          cartMinQuantity: yup.number().positive("Cart min quantity must be positive").required("Cart min quantity is required"),
          cartMaxQuantity: yup.number().positive("Cart max quantity must be positive").required("Cart max quantity is required"),
          hsn: yup.string().required("Hsn is required"),
          mpn: yup.string().required("Mpn is required"),
          barcode: yup.string().required("Barcode is required"),
          galleryImage: yup.array().of(yup.string()).required("Gallery image is required"),
          variantImage: yup.mixed().required("Variant image is required"),
          productVariantAttributes: yup.array().of(
            yup.object().shape({
              attributeId: yup.string().required("Attribute id is required"),
              attributeDetailId: yup.string().required("Attribute detail id is required"),
            })
          ),
          specificationId: yup.string().required("Specification id is required"),
          specificationDetailId: yup.string().required("Specification detail id is required"),
        })
      ),
    })
  ),
    // weight: yup.number().positive("Weight must be positive").required("Weight is required"),
  // tags: yup.string().required("Tags are required"),
  // pageTitle: yup.string().required("Page title is required"),
  // isVariant: yup.boolean().required("Is variant is required"),
  // metaTitle: yup.string().required("Meta title is required"),
  // metaKeywords: yup.string().required("Meta keywords are required"),
  // metaDescription: yup.string().required("Meta description is required"),
  // ogTitle: yup.string().required("OG title is required"),
  // ogDescription: yup.string().required("OG description is required"),
  // twitterTitle: yup.string().required("Twitter title is required"),
  // twitterDescription: yup.string().required("Twitter description is required"),
    // removedGalleryImages: yup.array().of(yup.string()).required("Removed gallery image is required"),
  // completeTab: yup.boolean().required("Complete tab is required"),
  // measurements: yup.object().shape({
  //   weight: yup.number().positive("Weight must be positive").required("Weight is required"),
  //   height: yup.number().positive("Height must be positive").required("Height is required"),
  //   length: yup.number().positive("Length must be positive").required("Length is required"),
  //   width: yup.number().positive("Width must be positive").required("Width is required"),
  // }),
  // productSpecification: yup.array().of(
  //   yup.object().shape({
  //     specificationId: yup.string().required("Specification id is required"),
  //     specificationDetailId: yup.string().required("Specification detail id is required"),
  //   })
  // ),
  // productSeo: yup.object().shape({
  //   metaTitle: yup.string().required("Meta title is required"),
  //   metaKeywords: yup.string().required("Meta keywords are required"),
  //   metaDescription: yup.string().required("Meta description is required"),
  // }),
});


