import { Box } from "@mui/material";
import React from "react";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box p={4} bgcolor="#ffffff">
      {children}
    </Box>
  );
};

export default LayoutWrapper;
