import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  Avatar,
  Container,
  Box,
} from "@mui/material/";

import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../redux/features/authSlice";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const history = useHistory();

  const handleHome = () => {
    history.push("/");
  };
  const logoutHandler = () => {
    dispatch(logoutSuccess());
    localStorage.removeItem('auth') 

  };

  console.log(auth)

  return (
    <Toolbar>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            style={{
              background: "white",
              color: "#212121",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
              marginBottom: "2rem"
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                style={{ cursor: "pointer" }}
                onClick={() => handleHome()}
              >
                MERN FORUM
              </Typography>
           
              {auth?.isAuthenticated || localStorage.getItem('auth') ? (
                <>
                  <Avatar
                    className="Avatar"
                    alt={auth?.user?.username}
                    sx={{ mr: 2 }}
                    component={Link}
                    to="/profile"
                  >
                    {auth?.user?.username?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Button
                    color="inherit"
                    onClick={() => logoutHandler()}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button component={Link} to="/auth" color="inherit">
                    Login
                  </Button>
                  <Button component={Link} to="/register" color="inherit">
                    Register
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    </Toolbar>
  );
};

export default Navbar;
