import { FilterProps } from "../../types/components/component-types";

export const useTableActions = ({
  filters,
  setParams,
}: {
  filters: FilterProps[];
  setParams: (params: any) => void;
}) => {
  const updateParams = (newParams: any) => {
    setParams((prevParams) => ({ ...prevParams, ...newParams }));
  };

  const handleChange = (key: string, value: string) => {
    updateParams({ [key]: value });
  };

  const clearFilters = () => {};

  const handleApplyFilters = () => {
    console.log("Applying filters:", filters);
  };

  const statusChangeHandler = (id: string, status: number) => {
    console.log(`Status changed for ID ${id} to ${status}`);
  };
  

  return {
    handleChange,
    clearFilters,
    handleApplyFilters,
    statusChangeHandler,
  };
};
