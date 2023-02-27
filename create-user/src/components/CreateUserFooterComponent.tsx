import { FC } from "react";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { Typography } from "@mui/material";

// I could have hardcoded this but went for a reusable basic footer component

type CreateUserFooterComponentProps = {
  bodyText: string;
  justifyContent?: string;
};

const CreateUserFooterComponent: FC<CreateUserFooterComponentProps> = ({
  bodyText,
  justifyContent,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: justifyContent ?? "left",
      }}
    >
      <Typography variant="caption" sx={{ opacity: 0.75, color: grey[600] }}>
        {bodyText}
      </Typography>
    </Box>
  );
};

export default CreateUserFooterComponent;
