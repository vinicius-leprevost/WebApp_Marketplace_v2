import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Typography, TextField, Button, Alert } from "@mui/material";
import { signin } from "../../frontend-ctrl/api-auth.js";
import { useAuth } from "../../helpers/auth-context";
import "./Signin.css";

export default function Signin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const isValidEmail = (email) => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const clickSubmit = () => {
    if (!isValidEmail(values.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        setMessage({ type: "error", text: data.error });
      } else {
        login(data, () => {
          setMessage({ type: "success", text: "Welcome back!" });
          setTimeout(() => navigate("/"), 1500); 
        });
      }
    });
  };

  return (
    <div className="signin-container">
      <Card className="signin-card">
        {/* Left Section: Illustration */}
        <div className="signin-left"></div>

        {/* Right Section: Form */}
        <div className="signin-right">
          <Typography variant="h4" className="signin-title" fontWeight={"bold"}>
            Welcome Back
          </Typography>
          {/* Display Message */}
          {message.text && (
            <Alert severity={message.type} className="signin-alert">
              {message.text}
            </Alert>
          )}
          <TextField
            id="email"
            label="Email Address"
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            fullWidth
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
            fullWidth
          />
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={clickSubmit}
            fullWidth
            className="signin-button"
          >
            Log In
          </Button>
          <Typography variant="body2" className="signin-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Typography>
        </div>
      </Card>
    </div>
  );
}
