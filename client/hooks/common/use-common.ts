'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import useApi from "../api/use-api";
import { useCommonHandler } from "./use-common-handler";
import { FilterProps } from "../../types/components/component-types";
import { handleApiRequest } from "../../config/wrapper/api-wrapper";
import { mapDataToFormData } from "../../utils/helper/form/form-functions";
import { STATUS_ENUM } from "../../constants/common/common-constants";

interface UseCommonHook<T, F> {
    endpoint: string;
    redirectLink: string;
    defaultFilters?: any;
    mapToFormValues: (data: any) => T;
    tableFilters?: FilterProps[];
}

export const useCommonHook = <T, F = any>({
    endpoint,
    redirectLink,
    defaultFilters = {} as F,
    mapToFormValues,
    tableFilters = [],
}: UseCommonHook<T, F>) => {
    const [itemData, setItemData] = useState<T | null>(null);
    const router = useRouter();
    const {
        handleSearchInput,
        handleFilterChange,
        textInput,
        params,
        clearFilter,
        filterValues,
        handleApplyFilters,
        toggleEditMode,
        handleEditCancel,
        isEditing,
        isSubmitting,
        handleFormSubmit,
    } = useCommonHandler();

    const {
        data: allItemsList,
        triggerRequest: triggerAllItemsList,
        status,
    } = useApi(endpoint, "get", {
        defaultParams: defaultFilters
    });

    const fetchItemWithId = async (id: string) => {
        const { data, error }: { data: any, error: any } = await handleApiRequest(endpoint + `/${id}`, "get");
        if (data) {
            setItemData(mapToFormValues(data?.requestedData));
        }
    };

    const changeItemStatus = async (id: string, newStatus: string, statusType: any) => {
        // return handleStatusChange({
        //     id,
        //     newStatus,
        //     endpoint: statusType,
        //     refreshCallback: triggerAllItemsList,
        // });
    };

    const updateItemHandler = async (data: T, id?: string) => {
        return handleFormSubmit({
            data,
            endpoint: `${endpoint}/${id || ""}`,
            formatter: (formData) => mapDataToFormData(formData, undefined),
            successCallback: () => router.push(redirectLink),
        });
    };

    const defaultTableFilters: FilterProps[] = [
        {
            label: "Search by Status",
            key: "status",
            type: "select",
            options: [
                { value: STATUS_ENUM.ACTIVE, label: "Active" },
                { value: STATUS_ENUM.INACTIVE, label: "Inactive" },
            ],
            value: filterValues?.status || params?.status || "",
            onChange: (value: any) => handleFilterChange("status", value),
        },
    ];

    return {
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
        filterValues,
        textInput,
        itemData,
        tableFilters: [...defaultTableFilters, ...tableFilters],
    };
};