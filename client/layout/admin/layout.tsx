"use client";

import { usePathname } from "next/navigation";
import { createTheme, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { NAVIGATION } from "./menu-items";
import HeaderMenuRight from "./header-components/header-menu-right";
import LayoutWrapper from "../../components/common/wrapper/style/layout-wrapper";

const demoTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function renderHeaderMenuRight() {
  return <HeaderMenuRight />;
}

export default function HydrogenLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={demoTheme}>
      <NextAppProvider navigation={NAVIGATION}>
        <DashboardLayout
          slots={{
            toolbarActions: renderHeaderMenuRight,
          }}
          sx={{
            ".MuiListItemIcon-root": {
              marginRight: 0,
            },
            ".MuiButtonBase-root.MuiListItemButton-root.MuiListItemButton-gutters": {
              marginLeft: 1,  
            },

          }}
        >
          <LayoutWrapper>{children}</LayoutWrapper>
        </DashboardLayout>
      </NextAppProvider>
    </ThemeProvider>
  );
}
