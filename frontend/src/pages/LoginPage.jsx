import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      login(data.token);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 5 }}
    >
      <Typography variant="h5">Login</Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" type="submit" fullWidth>
        Login
      </Button>
    </Box>
  );
}
