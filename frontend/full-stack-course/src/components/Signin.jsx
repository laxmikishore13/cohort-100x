import {
  Alert,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import useAuth from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const Navigate = useNavigate();

  const { error, token, authenticationRequest } = useAuth(
    "login",
    username,
    password
  );

  const dataToLS = (token) => {
    if (token?.token) {
      localStorage.setItem("usertoken", JSON.stringify(token?.token));
      Navigate("/admin/courses");
    }
  };

  useEffect(() => {
    dataToLS(token);
  }, [token]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div style={{ marginTop: "7em" }}>
          <Typography textAlign="center" variant="h5">
            Sign in...
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="username"
                required
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="password"
                type="password"
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <FormControlLabel
            sx={{ marginTop: 1 }}
            control={
              <Checkbox value={isChecked} onChange={() => setIsChecked(true)} />
            }
            label="Remember me.."
          />
          <div>
            <Button
              onClick={authenticationRequest}
              fullWidth
              variant="contained"
              sx={{ marginTop: 1 }}
            >
              Sign in
            </Button>
          </div>
          {error ? (
            <Snackbar open={error} autoHideDuration={1000}>
              <Alert open={error} severity="error" sx={{ width: "100%" }}>
                Admin already exists
              </Alert>
            </Snackbar>
          ) : null}
        </div>
      </Container>
    </>
  );
}

export default Signin;
