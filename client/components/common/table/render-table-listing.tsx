"use client";

import React, { useEffect, useState } from "react";
import RcTable from "@/components/common/table/components/table";
import ComponentWrapper from "@/components/common/wrapper/component-wrapper";
import TableActions from "@/components/common/table/components/table-right-content";
import { useRouter } from "next/navigation";

const RenderListingPage = ({
  title,
  dataHook,
  columns,
  createRoute,
  emptyText = "No items found",
  hideCreateButton = false,
  additionalRightContent = null,
}) => {
  const router = useRouter();

  const {
    triggerAllItemsList,
    allItemsList,
    params,
    changeItemStatus,
    handleSearchInput,
    textInput,
    tableFilters,
    clearFilter,
    handleApplyFilters,
    handleFilterChange,
  } = dataHook();

  useEffect(() => {
    triggerAllItemsList();
  }, []);

  const tableColumns = columns({
    changeItemStatus,
    data: allItemsList?.requestedData,
  });

  return (
    <ComponentWrapper
      title={title}
      enableBreadcrumbs
      rightContents={
        <>
          <TableActions
            hiddenFilters={tableFilters}
            enableSearch
            setTextInput={handleSearchInput}
            enableCreateButton={!hideCreateButton}
            onCreate={() => {
              router.push(createRoute);
            }}
            onchange={handleFilterChange}
            keyword={textInput}
            clearFilters={clearFilter}
            handleApplyFilters={handleApplyFilters}
          />
          {additionalRightContent}
        </>
      }
    >
      <RcTable
        columns={tableColumns}
        data={allItemsList?.requestedData}
        striped={true}
        emptyText={<span>{emptyText}</span>}
        totalCount={allItemsList?.totalCount}
        limit={params?.limit}
        page_size={params?.page_size}
      />
    </ComponentWrapper>
  );
};

export default RenderListingPage;
