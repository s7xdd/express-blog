import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Toolbar } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { FilterProps } from "@/types/components/table-types";
import Button from "../../button/button";
import { useTableFilters } from "@/hooks/table/use-table-filters";
import TableMoreFilters from "./table-more-filters";
import FilterListIcon from "@mui/icons-material/FilterList";

const TableActions = ({
  hiddenFilters,
  onchange,
  keyword,
  setTextInput,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  handleApplyFilters,
  headers,
  enableSearch,
  enableCreateButton,
  onCreate,
  clearFilters,
}: {
  hiddenFilters?: FilterProps[];
  onchange?: any;
  keyword?: string;
  setTextInput?: (key: string, value: string) => void;
  sortBy?: string;
  setSortBy?: (value: string) => void;
  sortOrder?: string;
  setSortOrder?: (value: string) => void;
  handleApplyFilters?: () => void;
  headers?: { value: string; label: string; hideFromSort?: boolean }[];
  enableSearch?: boolean;
  enableCreateButton?: boolean;
  onCreate?: () => void;
  clearFilters?: () => void;
}) => {
  const { filterComponents } = useTableFilters(hiddenFilters ?? [], onchange);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      <div
        style={{ display: "flex", width: "100%", justifyContent: "space-between", gap: "0.5rem", alignItems: "center" }}
      >
        {enableSearch && setTextInput ? (
          <TextField
            label="Search by keyword"
            variant="outlined"
            size="small"
            value={keyword ?? ""}
            onChange={(e) => setTextInput("keyword", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        ) : (
          false
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {hiddenFilters && hiddenFilters?.length > 0 && (
            <div style={{ flexGrow: 1 }}>
              <Button
                variant="outlined"
                className="!w-full"
                startIcon={<FilterListIcon />}
                fullWidth
                onClick={() => setDrawerOpen(true)}
              >
                More Filters
              </Button>
            </div>
          )}

          {headers && setSortBy && sortBy ? (
            <FormControl variant="outlined" size="small" sx={{ width: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
                {headers &&
                  headers
                    .filter((header) => header.hideFromSort !== true)
                    .map((header) => (
                      <MenuItem key={header.value} value={header.value}>
                        {header.label}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          ) : null}

          {setSortOrder && sortOrder ? (
            <FormControl variant="outlined" size="small" sx={{ width: 150 }}>
              <InputLabel>Sort Order</InputLabel>
              <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} label="Sort Order">
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          ) : null}

          {enableCreateButton && onCreate ? <Button onClick={onCreate}>Create</Button> : null}
        </div>
      </div>

      <TableMoreFilters
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        filterComponents={filterComponents}
        handleApplyFilters={handleApplyFilters}
        clearFilters={clearFilters}
      />
    </>
  );
};

export default TableActions;
