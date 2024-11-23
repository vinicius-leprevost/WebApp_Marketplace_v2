import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { create } from '../../frontend-ctrl/api-user.js';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, TextField, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import './Signup.css'; // Import the CSS file
import img from '../../assets/signup.png'; // Import the image file

export default function Signup() {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
    });

    const [open, setOpen] = useState(false); // Success dialog state

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
            if (data.error || !values.name || !values.email || !values.password) {
                alert(data.error || "Please fill all the fields.");
                setValues({
                    name: '',
                    password: '',
                    email: '',
                });
            } else {
                alert("Account successfully created. Please sign in.");
                setValues({
                    name: '',
                    password: '',
                    email: '',
                });
            }
        });
    };

    return (
        <div className="signup-container">
            <div className="signup-image">
                <img src={img} alt="Signup" />
            </div>
            <div className="signup-form">
                <Card>
                    <CardContent>
                        <Typography variant="h6">
                            Sign Up
                        </Typography>
                        {values.error && <Typography color="error" variant="body2">{values.error}</Typography>} {/* Display error if any */}
                        <TextField
                            id="name"
                            label="Name"
                            value={values.name}
                            onChange={handleChange('name')}
                            margin="normal"
                            fullWidth
                        />
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
                            Create Account
                        </Button>
                    </CardActions>
                    <CardActions>
                        <Button color="primary" variant="contained" onClick={() => {
                            window.location.href = '/signin';
                        }}>
                            Already have an account? Sign in
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}

