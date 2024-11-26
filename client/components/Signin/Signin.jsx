import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { signin } from '../../frontend-ctrl/api-auth.js';
import { useAuth } from '../../helpers/auth-context';
import './Signin.css';

export default function Signin() {
  const location = useLocation();
  const { login } = useAuth();
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        login(data, () => {
          setValues({ ...values, error: '', redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { from } = location.state || { from: { pathname: '/' } };
  const { redirectToReferrer } = values;

  if (redirectToReferrer) {
    return <Navigate to={from} />;
  }

  return (
    <div className="signin-container">
      <Card className="signin-card">
        <Grid container>
          <Grid item xs={12} md={6} className="signin-left">
            <Typography variant="h4" className="signin-title">
              Welcome Back
            </Typography>
            <TextField
              id="email"
              label="Email Address"
              value={values.email}
              onChange={handleChange('email')}
              margin="normal"
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange('password')}
              margin="normal"
              fullWidth
            />
            {values.error && (
              <Typography color="error" variant="body2" className="signin-error">
                {values.error}
              </Typography>
            )}
            <Button
              color="primary"
              variant="contained"
              onClick={clickSubmit}
              fullWidth
              className="signin-button"
            >
              Log In
            </Button>
            <Typography variant="body2" align="center" className="signin-footer">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} className="signin-right">
            <div className="signin-illustration">
              
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
