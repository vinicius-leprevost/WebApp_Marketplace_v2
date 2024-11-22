import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { create } from '../../jjj/api-user.js';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, TextField, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

export default function Signup() {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
    });

    const [open, setOpen] = useState(false);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
        };

        create(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setOpen(true);
            }
        });
    };

    Signup.propTypes = {
        open: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
    };

    return (
        <div>
      <Card> 
        <CardContent>
          <Typography variant="h6"> 
            Sign Up
          </Typography>
                  
          <TextField
            id="name"
            label="Name"
            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            value={values.email}
            onChange={handleChange('email')}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            value={values.password}
            onChange={handleChange('password')}
            type="password"
            margin="normal"
          />
        </CardContent> 
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} >
            Submit
          </Button>
        </CardActions> 
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/Signin">
            <Button color="primary" autoFocus variant="contained" onClick={handleClose}>
              Sign In 
            </Button>
          </Link>
        </DialogActions> 
      </Dialog>
    </div>
    );
}
