import { AppBar, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

//todo: 1) signup and sign up and logout buttons should render conditionally.
//todo: 2) show user info beside logout after user signed in.

function Navigationbar() {
  return (
    <>
      <AppBar sx={{ p: 2, backgroundColor: "white" }} position="fixed">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              component="h1"
              color="black"
              fontWeight="600"
            >
              PATHASHALA
            </Typography>
          </NavLink>
          <div style={{ display: "flex", gap: "10px" }}>
            <NavLink to="/admin/signup">
              <Button variant="contained" color="primary">
                Sign up
              </Button>
            </NavLink>
            <NavLink to="/admin/login">
              <Button variant="contained" color="primary">
                Sign in
              </Button>
            </NavLink>
          </div>
        </div>
      </AppBar>
    </>
  );
}

export default Navigationbar;
