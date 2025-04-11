"use client";

import RenderListingPage from "../../../../components/common/table/render-table-listing";
import { WEBSITE_ROUTES } from "../../../../config/website/routes";
import { useProducts } from "../../../../hooks/blogs/use-blogs";
import { ProductListTableColumns } from "../../../../utils/modules/table/columns/product-list-table";

const ProductsList = () => {
  return (
    <RenderListingPage
      title="Products List"
      dataHook={useProducts}
      columns={ProductListTableColumns}
      createRoute={WEBSITE_ROUTES.pages.createproduct}
      emptyText="No products found"
    />
  );
};

export default ProductsList;
