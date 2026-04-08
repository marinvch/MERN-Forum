import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useRedux";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, TextField, Button, Stack, Typography } from "@mui/material";
import { useRegisterMutation } from "../authApi";
import { registerSuccess, loginSuccess } from "../authSlice";

const RegisterForm: React.FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await register(userData).unwrap();
      dispatch(registerSuccess(result.user));
      dispatch(loginSuccess(result.user));
      localStorage.setItem("token", result.token as string);
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignup}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, mx: "auto", mt: 4 }}
    >
      <Typography variant="h5" component="h2">
        Register your Account
      </Typography>
      <AccountCircleIcon style={{ marginTop: "15px", fontSize: "30px" }} color="primary" />
      <TextField id="email" name="email" type="email" label="Email" variant="standard" onChange={handleInput} required />
      <TextField id="username" name="username" type="text" label="Username" variant="standard" onChange={handleInput} required />
      <TextField id="password" name="password" type="password" label="Password" variant="standard" onChange={handleInput} required />
      <TextField
        id="repeatPassword"
        name="repeatPassword"
        type="password"
        label="Repeat Password"
        variant="standard"
        onChange={handleInput}
        required
      />
      <Button type="submit" variant="contained">
        Sign Up
      </Button>
      <Stack>
        <Typography style={{ marginTop: "15px" }}>Already have an account?</Typography>
        <Button style={{ marginTop: "15px" }} onClick={() => navigate("/auth")}>
          <ArrowRightIcon /> Login
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
