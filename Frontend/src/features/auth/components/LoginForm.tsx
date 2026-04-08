import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useRedux";
import { Box, TextField, Button, Stack, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useLoginMutation } from "../authApi";
import { loginSuccess } from "../authSlice";

const LoginForm: React.FC = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(userData).unwrap();
      localStorage.setItem("token", result.token as string);
      dispatch(loginSuccess(result.user));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, mx: "auto", mt: 4 }}
    >
      <Typography variant="h5" component="h2">
        Please enter email and password
      </Typography>
      <TextField
        id="email"
        name="email"
        type="email"
        label="Email"
        variant="standard"
        onChange={handleInput}
        required
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label="Password"
        variant="standard"
        onChange={handleInput}
        required
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
      <Stack>
        <Typography style={{ marginTop: "15px" }}>
          Don't have an account?
        </Typography>
        <Button style={{ marginTop: "15px" }} onClick={() => navigate("/register")}>
          <ArrowRightIcon /> Register
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
