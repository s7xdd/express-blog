import { Box, Drawer, Typography } from "@mui/material";
import React from "react";
import Button from "../../button/button";
import { useRouter } from "next/navigation";

interface TableMoreFiltersProps {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  filterComponents: React.ReactNode;
  handleApplyFilters?: () => void;
  clearFilters?: () => void;
}

const TableMoreFilters = ({
  drawerOpen,
  setDrawerOpen,
  filterComponents,
  handleApplyFilters,
  clearFilters,
}: TableMoreFiltersProps) => {
  const router = useRouter();

  const handleClearFilters = () => {
    clearFilters?.();
    router.push(window.location.pathname);
    setDrawerOpen(false);
  };

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ width: 300, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          More Filters
        </Typography>
        {filterComponents}
        <div className="flex flex-row gap-3">
          {handleApplyFilters && (
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setDrawerOpen(false);
                handleApplyFilters();
              }}
            >
              Apply
            </Button>
          )}
          {clearFilters && (
            <Button variant="contained" fullWidth onClick={handleClearFilters}>
              Clear
            </Button>
          )}
        </div>
      </Box>
    </Drawer>
  );
};

export default TableMoreFilters;
