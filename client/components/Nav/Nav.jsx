import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import logo from '../../assets/logo.png';
import './Nav.css';

const Nav = () => {
    return (
        <AppBar position="static" className='navbar'>
            <Toolbar className='nav'>
                <IconButton edge="start" color="inherit" aria-label="menu" className='menuExpander'>
                    <MenuIcon/>
                </IconButton>
                <img src={logo} alt="Logo" className="logo" />
                <Typography variant="h6" className="name">
                    CanTrade
                </Typography>
                <Button color="inherit" component={NavLink} to="/" className="navLink" activeClassName="active">Home</Button>
                <Button color="inherit" component={NavLink} to="/about" className="navLink" activeClassName="active">About</Button>
                <Button color="inherit" component={NavLink} to="/contact" className="navLink" activeClassName="active">Contact</Button>
                <Button color="inherit" component={NavLink} to="/signup" className="navLink" activeClassName="active">Sign Up</Button>
                <div className="search">
                    <div className="searchIcon">
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        className="inputBase"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <IconButton color="inherit">
                    <AccountCircleTwoToneIcon />
                </IconButton>
                <IconButton color="inherit">
                    <FavoriteTwoToneIcon />
                </IconButton>
                <IconButton color="inherit">
                    <ShoppingCartTwoToneIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Nav;