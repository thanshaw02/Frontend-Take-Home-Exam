import { FC, useState } from "react";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { State } from "../model/fetchRewards";

type CommongSelectComponentProps = {
  label: string;
  name: string;
  selectOptions?: Array<string | State>;
};

const CommonSelectComponent: FC<CommongSelectComponentProps> = ({
  label,
  name,
  selectOptions,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleOnChange = (event: SelectChangeEvent<string>) => {
    const selectValue = event.target.value;
    setSelectedValue(selectValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        size="medium"
        name={name}
        label={label}
        value={selectedValue}
        onChange={handleOnChange}
        renderValue={(selectedItem) => (
          <Box sx={{ display: "flex" }}>
            <Chip key={selectedItem} label={selectedItem} />
          </Box>
        )}
      >
        {selectOptions?.map((option) => {
          const value =
            typeof option !== "string"
              ? `${option.name}, ${option.abbreviation}`
              : option;
          return (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CommonSelectComponent;
