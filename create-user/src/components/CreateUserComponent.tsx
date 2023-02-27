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

// I'd really like to reduce the number of states I have in this component

const CreateUserComponent: FC<unknown> = () => {
  // states keeping track of user submitted data
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [state, setState] = useState<string>("");

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

  const clearFormData = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");

    // these two may cause issues
    setOccupation("");
    setState("");
  };

  // I'm not a huge fan of this method, would be nice to have a method that maps the correct error message out
  // I could have gone with a form, but I wanted a more customized error message
  const handleOnSubmit = () => {
    setSuccess("");
    setError("");

    if (!firstName) {
      setError("Please enter a first name");
      return;
    }

    if (!lastName) {
      setError("Please enter a last name");
      return;
    }

    if (!email) {
      setError("Please enter an email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    if (!occupation) {
      setError("Please select an occupation");
      return;
    }

    if (!state) {
      setError("Please select a state");
      return;
    }

    setIsLoaded(false);

    // possibly change this from passing a custom type to jst passing all of the attributes individually
    FetchRewards.submitUserData(
      `${firstName} ${lastName}`,
      email,
      password,
      occupation,
      state
    ).then(
      () => {
        // success
        clearFormData();
        setSuccess("You have successfully submitted the form!");
        setIsLoaded(true);
      },
      (err) => {
        // error
        setIsLoaded(true);
        setError("Failed to submit the form");
        console.error(`Error posting form data -- ${err}`);
      }
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: { xs: 3, md: 18 },
      }}
    >
      <Paper elevation={9} sx={{ padding: 2 }}>
        {isLoaded ? (
          <Grid justifyContent="center" alignItems="center" maxWidth="xs">
            <Grid item xs={12}>
              <Typography component="h1" variant="h4">
                Create User
              </Typography>
            </Grid>
            {error && (
              <Grid xs={12} sx={{ mt: 2 }}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            {success && (
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Alert severity="success">{success}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                required
                size="medium"
                variant="outlined"
                label="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                sx={{ mt: 4, mr: 2 }}
              />
              <TextField
                required
                size="medium"
                variant="outlined"
                label="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                sx={{ mt: 4 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                size="medium"
                variant="outlined"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="password"
                size="medium"
                variant="outlined"
                label="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <CommonSelectComponent
                label="Occupation"
                selectOptions={fetchRewardsData?.occupations}
                onValueChange={(occupation: string) => {
                  console.log(
                    `Occuptation option has been selected: ${occupation}`
                  );
                  setOccupation(occupation);
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <CommonSelectComponent
                label="State"
                selectOptions={fetchRewardsData?.states}
                onValueChange={(state: string) => {
                  console.log(`State option has been selected: ${state}`);
                  setState(state);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                onClick={handleOnSubmit}
                variant="outlined"
                size="large"
                sx={{
                  mt: 4,
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        ) : (
          // need to change the sizing of this
          <CircularProgress />
        )}
      </Paper>
    </Box>
  );
};

export default CreateUserComponent;
