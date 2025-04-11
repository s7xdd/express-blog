import { FilterProps } from "@/types/components/table-types";

export const ProductListTableFilters = (onChange: (key: string, value: any) => void): FilterProps[] => [
    {
        label: "Search by Status",
        key: "status",
        type: "select",
        options: [
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
        ],
        value: "",
        onChange: (value: any) => onChange("status", value),
    },
    {
        label: "Search by Category",
        key: "category",
        type: "autocomplete",
        value: "",
        onChange: (value: any) => onChange("category", value),
    },
    {
        label: "Search by Brand",
        key: "brand",
        type: "autocomplete",
        value: "",
        onChange: (value: any) => onChange("brand", value),
    },

];

