import { FC, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";

type CommongSelectComponentProps = {
  label: string;
  selectOptions: Array<string>;
  onValueChange: () => void; // handles when a select option is selected
};

const CommonSelectComponent: FC<CommongSelectComponentProps> = ({
  label,
  selectOptions,
  onValueChange
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleOnChange = (event: SelectChangeEvent<string>) => {
    // empty logic for now
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        size="medium" // possibly change later
        id={label}
        label={label}
        value={selectedValue}
        onChange={handleOnChange}
      >
        {selectOptions.map((option) => (
          <MenuItem value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CommonSelectComponent;