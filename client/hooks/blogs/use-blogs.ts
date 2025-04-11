
export const useProducts = () => {
    const {
        triggerAllItemsList,
        allItemsList,
        status,
        params,
        updateItemHandler,
        changeItemStatus,
        isSubmitting,
        clearFilter,
        isEditing,
        handleApplyFilters,
        fetchItemWithId,
        handleEditCancel,
        toggleEditMode,
        handleSearchInput,
        handleFilterChange,
        textInput,
        filterValues,
        itemData,
        tableFilters
    } = useGenericHook<ProductFormFieldProps>({
        endpoint: apiEndpoints.product.products(),
        redirectLink: WEBSITE_ROUTES.pages.product(),

        mapToFormValues: (product: ProductProps) => mapBrandDataToForm(product),
    });

    return {
        triggerAllItemsList,
        allItemsList,
        status,
        params,
        updateItemHandler,
        changeItemStatus,
        isSubmitting,
        clearFilter,
        textInput,
        isEditing,
        handleApplyFilters,
        fetchItemWithId,
        handleEditCancel,
        toggleEditMode,
        handleSearchInput,
        handleFilterChange,
        filterValues,
        itemData,
        tableFilters
    }
}

const mapBrandDataToForm = (product: ProductProps): ProductFormFieldProps => {
    const mappedData = {
        // ...product,
        productTitle: product?.productTitle,
        description: product?.description,
        longDescription: product?.longDescription,
        tags: product?.tags,
        unit: product?.unit,
        sku: product?.sku,
        isVariant: product?.isVariant,

        brand: product?.brand?._id,
        productCategory: product?.productCategory?.[0]?._id || "",
        // Media Mapping
        productImageUrl: getImageOrVideoUrl(product?.productImageUrl) || "",
        productImage: product?.productImageUrl ? [
            {
                path: product?.productImageUrl,
                relativePath: product?.productImageUrl,
                preview: getImageOrVideoUrl(product?.productImageUrl),
                isServer: true,
            }
        ] : [],
        galleryImage: product?.imageGallery?.map((image) => ({
            path: image?.galleryImageUrl,
            relativePath: image?.galleryImageUrl,
            preview: getImageOrVideoUrl(image?.galleryImageUrl),
            isServer: true,
        })),
        removedGalleryImages: [],
        completeTab: product?.completeTab,

        // Measurements Mapping
        measurements: {
            weight: product?.measurements?.weight,
            hight: product?.measurements?.hight,
            length: product?.measurements?.length,
            width: product?.measurements?.width,
        },

        // Variants Mapping
        variants: [
            {
                countryId: product?.productVariants[0]?.countryId || "",
                productVariants: product?.productVariants?.map((variant) => ({
                    variantSku: variant?.variantSku || "",
                    price: variant?.price?.toString() || "",
                    extraProductTitle: variant?.extraProductTitle || "",
                    discountPrice: variant?.discountPrice?.toString() || "",
                    quantity: variant?.quantity?.toString() || "",
                    isDefault: variant?.isDefault,
                    variantDescription: variant?.variantDescription || "",
                    cartMinQuantity: variant?.cartMinQuantity?.toString() || "",
                    cartMaxQuantity: variant?.cartMaxQuantity?.toString() || "",
                    hsn: variant?.hsn || "",
                    mpn: variant?.mpn || "",
                    barcode: variant?.barcode || "",
                    galleryImage:
                        (variant?.variantImageGallery ?? [])?.map((image) => ({
                            path: image?.galleryImageUrl,
                            relativePath: image?.galleryImageUrl,
                            preview:
                                image?.galleryImageUrl ||
                                getImageOrVideoUrl(image?.galleryImageUrl), // Ensure preview property is set
                            isServer: true,
                        })) || [],
                    productVariantAttributes:
                        variant?.productVariantAttributes?.map((attr) => ({
                            attributeId:
                                attr?.attributeId ||
                                "",
                            attributeDetailId:
                                attr?.attributeDetailId ||
                                "",
                        })) ?? [],
                })),
            },
        ],

        imageGallery: product?.imageGallery,

        // Product Specifications
        productSpecification: product?.productCategory?.map((category) => ({
            specificationId: category?.category?._id,
            specificationDetailId: "",
        })),

        // Product SEO
        productSeo: {
            metaTitle: product?.productSeo?.metaTitle,
            metaKeywords: product?.productSeo?.metaKeywords,
            metaDescription: product?.productSeo?.metaDescription,
            ogTitle: product?.productSeo?.ogTitle,
            ogDescription: product?.productSeo?.ogDescription,
            twitterTitle: product?.productSeo?.twitterTitle,
            twitterDescription: product?.productSeo?.twitterDescription,
        },

        // SEO Information (assuming these need separate fields)
        pageTitle: product?.pageTitle,

    }

    return mappedData;
};
