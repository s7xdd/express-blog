import { useRouter } from "next/navigation";

export const ProductFormDefaultValues = {
  // Basic product details
  productTitle: "",
  description: "",
  longDescription: "",
  tags: "",
  brand: "",
  category: "",
  unit: "",
  pageTitle: "",
  sku: "",
  isVariant: false,

  // SEO information
  metaTitle: "",
  metaKeywords: "",
  metaDescription: "",
  ogTitle: "",
  ogDescription: "",
  twitterTitle: "",
  twitterDescription: "",

  // Media
  productImageUrl: "",
  productImage: null,

  imageGallery: [],

  galleryImage: [],
  removedGalleryImages: [],
  completeTab: false,

  // Measurements as a nested object
  measurements: {
    weight: "",
    height: "",
    length: "",
    width: ""
  },

  // Variants as an array of objects
  variants: [
    {
      countryId: "",
      productVariants: [
        {
          variantSku: "",
          price: "",
          extraProductTitle: "",
          discountPrice: "",
          quantity: "",
          isDefault: false,
          variantDescription: "",
          cartMinQuantity: "",
          cartMaxQuantity: "",
          hsn: "",
          mpn: "",
          barcode: "",
          galleryImage: [],
          variantImage: null,
          productVariantAttributes: [
            {
              attributeId: "",
              attributeDetailId: ""
            }
          ],
          specificationId: "",
          specificationDetailId: ""
        }
      ]
    }
  ],

  // Product specifications
  productSpecification: [
    {
      specificationId: "",
      specificationDetailId: ""
    }
  ],

  // Product SEO as a nested object
  productSeo: {
    metaTitle: "",
    metaKeywords: "",
    metaDescription: ""
  }
};

export const ProductFormFields = (props: any) => {
  const { brands, countries, categories } = props;
  const router = useRouter();


  return [
    {
      title: "Product Basic Details",
      description: "Add product description and necessary information",
      fields: [
        {
          name: "productTitle",
          label: "Product Title",
          type: "text",
          placeholder: "Enter product title"
        },
        {
          name: "brand",
          label: "Brand",
          type: "select",
          options: brands?.requestedData?.map((brand: BrandProps) => (
            { value: brand._id, label: brand.brandTitle }
          )) ?? []
        },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: categories?.requestedData?.map((category: CategoryProps) => (
            { value: category._id, label: category.categoryTitle }
          )) ?? []
        },
        {
          name: "unit",
          label: "Product Units",
          type: "text",
          placeholder: "Enter product units"
        },
        {
          name: "sku",
          label: "SKU",
          type: "text",
          placeholder: "Enter product SKU"
        },
        {
          name: "tags",
          label: "Tags",
          type: "text",
          placeholder: "Enter product tags (comma separated)"
        },
        {
          name: "description",
          label: "Short Description",
          type: "quill",
          placeholder: "Enter product description"
        },
        {
          name: "isVariant",
          label: "Has Variants",
          type: "checkbox",
          checkBoxLabel: "This product has variants"
        },
      ]
    },
    {
      title: "Product Measurements",
      description: "Add product dimensions",
      grids: 1,
      fields: [
        {
          name: "measurements",
          type: "group",
          nestedFields: [
            {
              name: "weight",
              label: "Weight (kg)",
              type: "number",
              placeholder: "Enter weight"
            },
            {
              name: "height",
              label: "Height (cm)",
              type: "number",
              placeholder: "Enter height"
            },
            {
              name: "length",
              label: "Length (cm)",
              type: "number",
              placeholder: "Enter length"
            },
            {
              name: "width",
              label: "Width (cm)",
              type: "number",
              placeholder: "Enter width"
            }
          ]
        }
      ]
    },
    {
      title: "Product Media",
      description: "Add product images",
      fields: [
        {
          name: "productImage",
          label: "Main Product Image",
          type: "file",
          requireExternalLabel: true
        },
        {
          name: "galleryImage",
          label: "Gallery Images",
          type: "file",
          requireExternalLabel: true
        }
      ]
    },
    {
      title: "Product Details",
      description: "Add detailed product information",
      grids: 1,
      fields: [
        {
          name: "longDescription",
          label: "Long Description",
          type: "quill",
          placeholder: "Enter detailed product description"
        },
        {
          name: "pageTitle",
          label: "Page Title",
          type: "text",
          placeholder: "Enter page title"
        }
      ]
    },
    {
      title: "Product Variants",
      description: "Add product variants by country",
      grids: 1,
      fields: [
        {
          label: "Variants",
          name: "variants",
          type: "group",
          grids: 1,
          allowMultiple: true,
          nestedFields: [
            {
              name: "productVariants",
              type: "group",
              requireIndex: true,
              showRemoveButton: true,
              showAddButton: true,
              allowMultiple: true,
              nestedFields: [
                {
                  name: "variantSku",
                  label: "Variant SKU",
                  type: "text",
                  placeholder: "Enter variant SKU"
                },
                {
                  name: "extraProductTitle",
                  label: "Variant Title",
                  type: "text",
                  placeholder: "Enter variant title"
                },
                {
                  name: "price",
                  label: "Price",
                  type: "number",
                  placeholder: "Enter price"
                },
                {
                  name: "discountPrice",
                  label: "Discount Price",
                  type: "number",
                  placeholder: "Enter discount price"
                },
                {
                  name: "quantity",
                  label: "Quantity",
                  type: "number",
                  placeholder: "Enter quantity"
                },
                {
                  name: "cartMinQuantity",
                  label: "Min Cart Quantity",
                  type: "number",
                  placeholder: "Minimum quantity for cart"
                },
                {
                  name: "cartMaxQuantity",
                  label: "Max Cart Quantity",
                  type: "number",
                  placeholder: "Maximum quantity for cart"
                },
                {
                  name: "hsn",
                  label: "HSN Code",
                  type: "text",
                  placeholder: "Enter HSN code"
                },
                {
                  name: "mpn",
                  label: "MPN",
                  type: "text",
                  placeholder: "Enter MPN"
                },
                {
                  name: "barcode",
                  label: "Barcode",
                  type: "text",
                  placeholder: "Enter barcode"
                },
                // Variant attributes section
                {
                  name: "productVariantAttributes",
                  label: "Variant Attributes",
                  type: "group",
                  allowMultiple: true,
                  nestedFields: [
                    {
                      name: "attributeId",
                      label: "Attribute",
                      type: "select",
                      options: [
                        { value: "color", label: "Color" },
                        { value: "size", label: "Size" },
                        { value: "material", label: "Material" }
                      ]
                    },
                    {
                      name: "attributeDetailId",
                      label: "Attribute Value",
                      type: "select",
                      options: [
                        { value: "red", label: "Red" },
                        { value: "blue", label: "Blue" },
                        { value: "xl", label: "XL" },
                        { value: "cotton", label: "Cotton" }
                      ]
                    }
                  ]
                },
                {
                  name: "isDefault",
                  label: "Default Variant",
                  type: "checkbox",
                  checkBoxLabel: "This is the default variant"
                },
                {
                  name: "variantDescription",
                  label: "Variant Description",
                  type: "quill",
                  placeholder: "Enter variant description"
                },
                {
                  name: "galleryImage",
                  label: "Variant Gallery Images",
                  type: "file",
                  requireExternalLabel: true
                },

              ]
            }
          ]
        }
      ]
    },
    // {
    //   title: "Product Specifications",
    //   description: "Add product specifications",
    //   fields: [
    //     {
    //       name: "productSpecification",
    //       type: "group",
    //       allowMultiple: true,
    //       nestedFields: [
    //         {
    //           name: "specificationId",
    //           label: "Specification",
    //           type: "select",
    //           options: [
    //             { value: "spec1", label: "Specification 1" },
    //             { value: "spec2", label: "Specification 2" }
    //           ]
    //         },
    //         {
    //           name: "specificationDetailId",
    //           label: "Specification Value",
    //           type: "select",
    //           options: [
    //             { value: "detail1", label: "Detail 1" },
    //             { value: "detail2", label: "Detail 2" }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      title: "SEO Information",
      description: "Add SEO details for better visibility",
      grids: 1,
      fields: [
        {
          name: "productSeo",
          type: "group",
          nestedFields: [
            {
              name: "metaTitle",
              label: "Meta Title",
              type: "text",
              placeholder: "Enter meta title"
            },
            {
              name: "metaKeywords",
              label: "Meta Keywords",
              type: "text",
              placeholder: "Enter meta keywords"
            },
            {
              name: "metaDescription",
              label: "Meta Description",
              type: "text",
              placeholder: "Enter meta description"
            }
          ]
        },
      ]
    }
  ];
}



