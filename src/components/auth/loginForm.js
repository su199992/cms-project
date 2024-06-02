import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import SignUpModal from "./signUp";
import AuthAlert from "./authAlert";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/homePage");
    } catch (error) {
      setErrorCode(error.code);
    }
  };

  const handleSignUpOpen = () => {
    setIsSignUpModalOpen(true);
  };

  const handleSignUpClose = () => {
    setIsSignUpModalOpen(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 550,
          height: 450,
          border: "1px solid",
          borderColor: "grey.500",
          boxSizing: "border-box",
        }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontSize: 70, color: "#9A9899", marginTop: 2.5, fontFamily: "NanumGothic", fontWeight: "700" }}>
          hunet
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          noValidate
          sx={{ display: "flex", flexDirection: "column", width: "90%", alignItems: "center", fontFamily: "NanumGothic" }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              width: "90%",
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
            sx={{
              marginBottom: 4,
              width: "90%",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              height: 56,
              fontSize: 22,
              marginBottom: 1.5,
              fontWeight: 700,
              width: "90%",
              fontFamily: "NanumGothic",
            }}>
            L O G I N
          </Button>
          <Button
            onClick={handleSignUpOpen}
            color="error"
            sx={{ textTransform: "none", fontSize: "18px", fontFamily: "NanumGothic" }}>
            SignUp
          </Button>
          <SignUpModal open={isSignUpModalOpen} onClose={handleSignUpClose} />
        </Box>
        <Typography variant="body2" sx={{ fontSize: 20, ontWeight: 700, color: "#9A9899", fontFamily: "NanumGothic" }}>
          Open Contents Management System
        </Typography>
      </Box>
      <AuthAlert errorCode={errorCode} />
    </Container>
  );
};

export default LoginForm;
