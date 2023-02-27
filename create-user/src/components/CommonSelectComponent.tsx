import { FC, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { State } from "../model/fetchRewards"

type CommongSelectComponentProps = {
  label: string;
  selectOptions?: Array<string | State>;
  onValueChange: (selectedValue: string) => void;
};

const CommonSelectComponent: FC<CommongSelectComponentProps> = ({
  label,
  selectOptions,
  onValueChange,
}) => {

  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleOnChange = (event: SelectChangeEvent<string>) => {
    const selectValue = event.target.value;
    setSelectedValue(selectValue);
    onValueChange(selectValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        size="medium"
        id={label}
        label={label}
        value={selectedValue}
        onChange={handleOnChange}
      >
        {selectOptions?.map((option) => {
          // ended up not using the state abbreviation attribute
          const value = typeof option !== "string" ? option.name : option; 
          return (
            <MenuItem value={value}>{value}</MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CommonSelectComponent;
