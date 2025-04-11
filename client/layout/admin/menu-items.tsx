import DescriptionIcon from "@mui/icons-material/Description";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { type Navigation } from "@toolpad/core/AppProvider";

export const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main Menu",
  },
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon fontSize="small" />,
  },
  {
    segment: "ecommerce",
    title: "E-Commerce",
    icon: <ShoppingBasketIcon fontSize="small" />,
    children: [
      {
        segment: "collections-brands",
        title: "Collections - Brands",
        icon: <DescriptionIcon fontSize="small" />,
      },
    ],
  },

  {
    kind: "divider",
  },
];
