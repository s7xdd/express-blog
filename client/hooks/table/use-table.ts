import { useState } from "react";

export interface TableDataItem {
  [key: string]: any;
}

export interface TableColumn<T extends TableDataItem> {
  id: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

export const useTable = <T extends TableDataItem>(
  data: T[],
  columns: TableColumn<T>[],
  title: string,
  initialHiddenColumns: (keyof T)[]
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hiddenColumns, setHiddenColumns] = useState<Array<keyof T>>(
    initialHiddenColumns as Array<keyof T>
  );
  const [columnVisibilityAnchor, setColumnVisibilityAnchor] =
    useState<null | HTMLElement>(null);
  const isColumnVisible = (columnId: keyof T) =>
    !hiddenColumns.includes(columnId);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const handleColumnVisibilityClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setColumnVisibilityAnchor(event.currentTarget);
  };

  const handleColumnVisibilityClose = () => {
    setColumnVisibilityAnchor(null);
  };

  const handleColumnVisibilityToggle = (columnId: keyof T) => () => {
    setHiddenColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId]
    );
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return {
    searchTerm,
    setSearchTerm,
    hiddenColumns,
    setHiddenColumns,
    columnVisibilityAnchor,
    setColumnVisibilityAnchor,
    isColumnVisible,
    handleColumnVisibilityClick,
    handleColumnVisibilityClose,
    handleColumnVisibilityToggle,
    handleMenuOpen,
    handleMenuClose,
    isMenuOpen,
    menuAnchorEl,
  };
};
