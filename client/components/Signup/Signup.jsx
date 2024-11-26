import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Card, Typography, TextField, Button } from "@mui/material";
import { create } from "../../frontend-ctrl/api-user.js";
import "./Signup.css";
import img from "../../assets/signup.png";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    create(user).then((data) => {
      if (data.error || !values.name || !values.email || !values.password) {
        alert(data.error || "Please fill all the fields.");
        setValues({
          name: "",
          password: "",
          email: "",
        });
      } else {
        alert("Account successfully created. Please sign in.");
        navigate("/signin");
      }
    });
  };

  return (
    <div className="signup-container">
      <Card className="signup-card">
        {/* Left Section: Illustration */}
        <div className="signup-left">
        </div>

        {/* Right Section: Form */}
        <div className="signup-right">
          <Typography variant="h4" className="signup-title">
            Create an Account
          </Typography>
          <TextField
            id="name"
            label="Name"
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
            fullWidth
          />
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
            onClick={clickSubmit}
            fullWidth
            className="signup-button"
          >
            Sign Up
          </Button>
          <Typography variant="body2" className="signup-footer">
            Already have an account? <Link to="/signin">Sign in</Link>
          </Typography>
        </div>
      </Card>
    </div>
  );
}
