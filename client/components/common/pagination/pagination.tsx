import React, { useState } from "react";
import { Box, Pagination as MUIPagination, PaginationItem, Stack, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ParamsProps } from "@/types/common";
import { SelectInput } from "../form/inputs";

interface PaginationProps {
  totalCount: number;
  limit: number;
  page_size: any;
}

const Pagination: React.FC<PaginationProps> = ({ totalCount, limit, page_size }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const [rowsPerPage, setRowsPerPage] = useState<number>(page_size);

  const pageCount = totalCount && limit && Math.ceil(totalCount / limit);

  const handleChange = (event: any, value: any) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page_size", value.toString());
    const queryString = newParams.toString();
    router.push(`${pathname}?${queryString}`);
  };

  const handleChangeRowsPerPage = (event: any) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("limit", event?.target?.value?.toString());
    newParams.set("page_size", "1");
    const queryString = newParams.toString();
    router.push(`${pathname}?${queryString}`);
    setRowsPerPage(parseInt(event?.target?.value, 10));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 0",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SelectInput
            name="limit"
            label="Rows per page"
            options={[
              { value: "10", label: "10" },
              { value: "25", label: "25" },
              { value: "50", label: "50" },
            ]}
            value={params?.limit ?? limit}
            onChange={handleChangeRowsPerPage}
            
          />
        </Box>

        <Box>
          <MUIPagination
            count={pageCount}
            page={Number(params?.page_size) ?? page_size}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
            renderItem={(item) => <PaginationItem {...item} />}
            hidePrevButton={page_size === 1}
            hideNextButton={page_size === pageCount}
            size="medium"
            sx={{
              "& .MuiPaginationItem-root": {
                margin: "0 2px",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Pagination;
