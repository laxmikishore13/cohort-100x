import { AppBar, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navigationbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("usertoken");
    if (userToken) {
      setIsLoggedIn(true);
    }
  });

  const logoutUser = () => {
    localStorage.removeItem("usertoken");
    Navigate("/");
    setIsLoggedIn(false);
  };

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
          {!isLoggedIn ? (
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
          ) : (
            <Button variant="contained" onClick={() => logoutUser()}>
              Logout
            </Button>
          )}
        </div>
      </AppBar>
    </>
  );
}

export default Navigationbar;
