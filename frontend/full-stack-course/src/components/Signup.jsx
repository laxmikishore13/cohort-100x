import {
  Alert,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const { error, token, authenticationRequest } = useAuth(
    "signup",
    username,
    password
  );

  useEffect(() => {
    token ? Navigate("/admin/login") : null;
  }, [token]);

  return (
    <>
      <Container maxWidth="xs" component="main">
        <div style={{ marginTop: "7em" }}>
          <Typography component="h6" variant="h5" textAlign="center">
            Sign up...
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="password"
                required
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            onClick={authenticationRequest}
            fullWidth
            variant="contained"
            sx={{ marginTop: 3 }}
          >
            Signup
          </Button>
        </div>
      </Container>
      {error ? (
        <Snackbar open={error} autoHideDuration={1000}>
          <Alert open={error} severity="error" sx={{ width: "100%" }}>
            Admin already exists
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
}

export default Signup;
