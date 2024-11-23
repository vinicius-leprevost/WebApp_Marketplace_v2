import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { signin } from '../../frontend-ctrl/api-auth.js';
import { useAuth } from '../../helpers/auth-context';
import { useLocation } from 'react-router-dom';
import './Signin.css';
import img from '../../assets/signup.png'; 

export default function Signin(props) {
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

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { from } = location.state || {
    from: {
      pathname: '/'
    }
  };
  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Navigate to={from} />;
  }

  return (
    <div className="signin-container">
      <div className="signin-image">
        <img src={img} alt="Signin" />
      </div>
      <div className="signin-form">
        <Card>
          <CardContent>
            <Typography variant="h6">
              Sign In
            </Typography>
            {values.error && <Typography color="error" variant="body2">{values.error}</Typography>} {/* Display error if any */}
            <TextField
              id="email"
              label="Email"
              value={values.email}
              onChange={handleChange('email')}
              margin="normal"
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              value={values.password}
              onChange={handleChange('password')}
              type="password"
              margin="normal"
              fullWidth
            />
          </CardContent>
          <CardActions>
            <Button color="error" variant="contained" onClick={clickSubmit}>
              Sign In
            </Button>
          </CardActions>
          <CardActions>
            <Button color="primary" variant="contained" component={Link} to="/signup">
              Don't have an account? Sign up
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}