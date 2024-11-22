import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { create } from '../../jjj/api-user.js';
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
        <div className="signup-container">
            <div className="signup-image">
                <img src={img} alt="Signup" />
            </div>
            <div className="signup-form">
                <Card>
                    <CardContent>
                        <Typography variant="h4">
                            Create an account
                        </Typography>
                        <Typography variant="body2">
                            Enter your details below
                        </Typography>
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
                        <Button color="error" size="large" variant="contained" onClick={clickSubmit}>
                            Create Account
                        </Button>
                    </CardActions>
                    <CardActions>
                        <Button color="primary" size="large" variant="contained" onClick={clickSubmit}>
                            Sign up with Google
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
        </div>
    );
}