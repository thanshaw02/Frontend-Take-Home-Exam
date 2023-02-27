import { FC, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CommonSelectComponent from "./CommonSelectComponent";
import FetchRewards from "../api/fetchRewards";
import FetchRewardsType from "../model/fetchRewards";
import CreateUserFooterComponent from "./CreateUserFooterComponent";

/**
 * Notes:
 *  - Instead of making each field "required" I opted for a more customized error/success handling
 *  - All fields are still required but are not handled by the form itself, instead I handle it on submit
 */

const CreateUserComponent: FC<unknown> = () => {
  // state keeping track of response from fetch rewards api
  const [fetchRewardsData, setFetchRewardsData] = useState<FetchRewardsType>();
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoaded(false);
    FetchRewards.getDataForForm().then(
      (fetchRewardData) => {
        // success
        setFetchRewardsData(fetchRewardData);
        setIsLoaded(true);
      },
      (err) => {
        // error
        console.error(`Error fetching occupations and states -- ${err}`);
        setError("Error loading data");
        setIsLoaded(true);
      }
    );
  }, []);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess("");
    setError("");

    const formData = new FormData(event.currentTarget);

    const firstName = formData.get("first-name");
    if (!firstName) {
      setError("Please enter a first name");
      return;
    }

    const lastName = formData.get("last-name");
    if (!lastName) {
      setError("Please enter a last name");
      return;
    }

    const email = formData.get("email");
    if (!email) {
      setError("Please enter an email address");
      return;
    }

    const password = formData.get("password");
    if (!password) {
      setError("Please enter a password");
      return;
    }

    const occupation = formData.get("occupation");
    if (!occupation) {
      setError("Please select an occupation");
      return;
    }

    const state = formData.get("state");
    if (!state) {
      setError("Please select a state");
      return;
    }

    setIsLoaded(false);
    FetchRewards.submitUserData(
      `${firstName.toString()} ${lastName.toString()}`,
      email.toString(),
      password.toString(),
      occupation.toString(),
      state.toString()
    ).then(
      () => {
        // success
        setSuccess("You have successfully submitted the form!");
        setIsLoaded(true);
      },
      (err) => {
        // error
        console.error(`Error posting form data -- ${err}`);
        setError("Failed to submit the form");
        setIsLoaded(true);
      }
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleOnSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: { md: 18 },
      }}
    >
      {/* form body */}
      <Paper elevation={9} sx={{ padding: 4 }}>
        {isLoaded ? (
          <Grid justifyContent="center" alignItems="center">
            {/* title form element */}
            <Grid item xs={12}>
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Register
              </Typography>
            </Grid>

            {/* error snackbar */}
            {error && (
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Alert
                  severity="error"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {error}
                </Alert>
              </Grid>
            )}

            {/* success snackbar */}
            {success && (
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Alert
                  severity="success"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {success}
                </Alert>
              </Grid>
            )}

            {/* first/last name text elements */}
            <Grid item xs={12} sx={{ mt: 4 }}>
              <TextField
                // required
                size="medium"
                variant="outlined"
                label="First Name"
                name="first-name"
                sx={{ mr: 2 }}
              />
              <TextField
                // required
                size="medium"
                variant="outlined"
                label="Last Name"
                name="last-name"
              />
            </Grid>

            {/* email/password text elements */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                // required
                type="email"
                size="medium"
                variant="outlined"
                label="Email"
                name="email"
                sx={{ mr: 2 }}
              />
              <TextField
                // required
                type="password"
                size="medium"
                variant="outlined"
                label="Password"
                name="password"
              />
            </Grid>

            {/* occupation select element */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <CommonSelectComponent
                label="Occupation"
                name="occupation"
                selectOptions={fetchRewardsData?.occupations}
              />
            </Grid>

            {/* state select element */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <CommonSelectComponent
                label="State"
                name="state"
                selectOptions={fetchRewardsData?.states}
              />
            </Grid>

            {/* submit button */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ py: 1 }}
              >
                Submit
              </Button>
            </Grid>

            {/* footer */}
            <Grid item xs={12} sx={{ mt: 5 }}>
              <CreateUserFooterComponent bodyText="Created by: Tylor Hanshaw" />
            </Grid>
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Paper>
    </Box>
  );
};

export default CreateUserComponent;
