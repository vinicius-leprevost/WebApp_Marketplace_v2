import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../helpers/auth-context';
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip, Zoom } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import logo from '../../assets/logo.png';
import './Nav.css';
import './Nav.module.css'

const Nav = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <AppBar position="static" className='navbar'>
            <Toolbar className='nav'>
                <img src={logo} alt="Logo" className="logo" />
                <Typography variant="h4" className="name">
                    CanTrade
                </Typography>
                <Button color="inherit" component={NavLink} to="/" className="navLink" activeClassName="active">Home</Button>
                <Button color="inherit" component={NavLink} to="/about" className="navLink" activeClassName="active">About</Button>
                <Button color="inherit" component={NavLink} to="/contact" className="navLink" activeClassName="active">Contact</Button>
                {isAuthenticated ? (
                    <>
                        <Button color="inherit" onClick={() => logout(() => navigate('/signin'))} className="navLink">Sign Out</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={NavLink} to="/signup" className="navLink" activeClassName="active">Sign Up</Button>
                        <Button color="inherit" component={NavLink} to="/signin" className="navLink" activeClassName="active">Sign In</Button>
                    </>
                )}
                <div className="search">
                    <div className="searchIcon">
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="What are you looking for?"
                        className="inputBase"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                {isAuthenticated ? (
                    <>
                        <Tooltip
                            title="Profile"
                            arrow
                            slots={{
                                transition: Zoom,
                            }}
                            slotProps={{
                                popper: {
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [0, -14],
                                            },
                                        },
                                    ],
                                },
                            }}>
                            <IconButton color="inherit" component={NavLink} to="/profile">
                                <AccountCircleTwoToneIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="Favourites"
                            arrow
                            slots={{
                                transition: Zoom,
                            }}
                            slotProps={{
                                popper: {
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [0, -14],
                                            },
                                        },
                                    ],
                                },
                            }}>
                            <IconButton color="inherit" component={NavLink} to="/favourites">
                                <FavoriteTwoToneIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="Cart"
                            arrow
                            slots={{
                                transition: Zoom,
                            }}
                            slotProps={{
                                popper: {
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [0, -14],
                                            },
                                        },
                                    ],
                                },
                            }}>
                            <IconButton color="inherit" component={NavLink} to="/cart">
                                <ShoppingCartTwoToneIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                    </>
                )}

            </Toolbar>
        </AppBar>
    );
};

export default Nav;