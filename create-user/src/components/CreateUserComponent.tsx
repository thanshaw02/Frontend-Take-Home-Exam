import { FC } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import CommonSelectComponent from "./CommonSelectComponent";

/**
 * Requirements:
 *  - Full name
 *  - Email
 *  - Password
 *  - Occupation
 *    - The values here are values fetched from the "https://frontend-take-home.fetchrewards.com/form" endpoint using a GET request
 *    - This will return a JSON body where the "occupations" attribute will be a simple array of strings
 *  - State
 *    - The values here are values fetched from the "https://frontend-take-home.fetchrewards.com/form" endpoint using a GET request
 *    - This will return a JSON body with where the "states" attribute will be an array of objects that look like this:
 *      {
 *        "name": "STATE_FULL_NAME",
 *        "abbreviation": "STATE_ABBREVIATION"
 *      }
 * 
 * What needs to happen:
 *  - All of the above fields will be in a form and sent via a POST request to the "https://frontend-take-home.fetchrewards.com/form" endpoint
 *  - POST request body will look like this:
 *    {
 *      "name": "USERS_FILL_NAME",
 *      "email": "USERS_EMAIL",
 *      "password": "USERS_PASSWORD",
 *      "occuptation": "USERS_SELECTED_OCCUPATION",
 *      "state": "USERS_SELECTED_STATE"
 *    }
 *  - The POST endpoint will return a 201 status code if all fields are provided
 */

type CreateUserComponentProps = {
  // empty props for now
};

const CreateUserComponent: FC<CreateUserComponentProps> = (props) => {

  return (
    <Box 
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: { xs: 3, md: 18 }
      }}
    >
      <Paper 
        elevation={9}
        sx={{ padding: 2 }}
      >
        <Box component="form">
          <Grid
            direction="row"
            justifyContent="center"
            alignItems="center"
            maxWidth="xs"
          >
            <Grid item xs={12}>
              <Typography component="h1" variant="h4">
                Create User
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="medium"
                variant="outlined"
                label="First Name"
                sx={{ mt: 4, mr: 2 }}
              />
              <TextField
                size="medium"
                variant="outlined"
                label="Last Name"
                sx={{ mt: 4 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="medium"
                variant="outlined"
                label="Email"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                size="medium"
                variant="outlined"
                label="Password"
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <CommonSelectComponent
                label="Occupation"
                selectOptions={[]} // empty array for now
                onValueChange={() => {
                  console.log("Occuptation option has been selected");
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <CommonSelectComponent
                label="State"
                selectOptions={[]} // empty array for now
                onValueChange={() => {
                  console.log("State option has been selected");
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateUserComponent;