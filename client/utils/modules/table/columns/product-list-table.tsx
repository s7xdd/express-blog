import HeaderCell from "@/components/common/table/components/header-cell";
import { WEBSITE_ROUTES } from "@/config/website/routes";
import { Visibility } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

export const ProductListTableColumns = (props: any) => {
  const { changeCountryStatus, data } = props;
  const router = useRouter();

  return [
    {
      title: "#",
      dataIndex: "product._id",
      key: "product._id",
      width: 50,
    },
    {
      title: <HeaderCell title="PRODUCT TITLE" sortable={true} />,
      dataIndex: "productTitle",
      key: "productTitle",
    },
    {
      title: <HeaderCell title="PRODUCT BRAND" sortable={true} />,
      key: "brand.brandTitle",
      render: (_, record) => record.brand?.brandTitle || "-",
    },
    {
      title: <HeaderCell title="PRODUCT CATEGORY" sortable={true} />,
      key: "category",
      render: (_, record) => {
        if (record.productCategory && record.productCategory.length > 0) {
          return record.productCategory[0].category?.categoryTitle || "-";
        }
        return "-";
      },
    },
    {
      title: <HeaderCell title="SKU" sortable={true} />,
      dataIndex: "sku",
      key: "sku",
    },
    {
      key: "view",
      render: (_, record) => (
        <Tooltip
          title="View product details"
          itemType="button"
          onClick={() => router.push(WEBSITE_ROUTES.pages.product(record._id))}
          className="cursor-pointer"
        >
          <Visibility />
        </Tooltip>
      ),
    },
  ];
};
