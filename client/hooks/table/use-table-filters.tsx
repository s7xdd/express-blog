import { Autocomplete, debounce, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { FilterProps } from "../../types/components/component-types";

export const useTableFilters = (filters: FilterProps[], onChange: (key: string, value: any) => void) => {
  const [options, setOptions] = useState<Record<string, any[]>>({});

  const handleFetchOptions = useCallback(
    debounce(async (inputValue: string, filter: FilterProps) => {
      if (inputValue.length < 2) return;
      if (filter.fetchOptions) {
        try {
          const fetchedOptions = await filter.fetchOptions(inputValue);
          setOptions((prev) => ({
            ...prev,
            [filter.key]: fetchedOptions,
          }));
        } catch (error) {
          console.error("Error fetching options:", error);
          setOptions((prev) => ({ ...prev, [filter.key]: [] }));
        }
      }
    }, 300),
    [],
  );

  const renderFilterComponent = (filter: FilterProps) => {
    const handleChange = (value: any) => {
      // filter.onChange(value);
      onChange(filter.key, value);
    };

    switch (filter.type) {
      case "text":
      case "number":
        return (
          <TextField
            variant="outlined"
            label={filter.label}
            type={filter.type}
            size="small"
            value={filter.value || ""}
            onChange={(e) => {
              let value = e.target.value.replace(/ /g, "").replace(/[^\w\s]/gi, "");
              handleChange(value.length === 0 ? "" : e.target.value);
            }}
            fullWidth
          />
        );
      case "select":
        return (
          <>
            <InputLabel id={`select-label-${filter.key}`}>{filter.label}</InputLabel>
            <Select
              labelId={`select-label-${filter.key}`}
              value={filter.value || ""}
              onChange={(e) => handleChange(e.target.value)}
              label={filter.label}
              fullWidth
            >
              {filter.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
        );
      case "date":
        return (
          <TextField
            type="date"
            variant="outlined"
            label={filter.label}
            size="small"
            value={filter.value || ""}
            onChange={(e) => handleChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            disabled={filter.disabled}
            inputProps={{
              min: filter.minDate,
            }}
            fullWidth
          />
        );
      case "autocomplete":
        return (
          <Autocomplete
            options={options[filter.key] || []}
            value={options[filter.key]?.find((opt) => opt.value === filter.value) || null}
            renderInput={(params) => (
              <TextField
                {...params}
                label={filter.label}
                onChange={(e) => handleFetchOptions(e.target.value, filter)}
              />
            )}
            onChange={(event, newValue) => {
              handleChange(newValue?.value || "");
            }}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            fullWidth
          />
        );
      default:
        return null; 
    }
  };

  const filterComponents = filters.map((filter) => (
    <FormControl variant="outlined" size="small" key={filter.key} sx={{ width: "100%", mb: 2 }} fullWidth>
      {renderFilterComponent(filter)}
    </FormControl>
  ));

  return { filterComponents };
};
