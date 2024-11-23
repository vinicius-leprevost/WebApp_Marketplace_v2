import React from 'react';
import { useAuth } from '../../helpers/auth-context';
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
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="static" className='navbar'>
      <Toolbar className='nav'>
        <IconButton edge="start" color="inherit" aria-label="menu" className='menuExpander'>
          <MenuIcon />
        </IconButton>
        <img src={logo} alt="Logo" className="logo" />
        <Typography variant="h6" className="name">
          CanTrade
        </Typography>
        <Button color="inherit" component={NavLink} to="/" className="navLink" activeClassName="active">Home</Button>
        <Button color="inherit" component={NavLink} to="/about" className="navLink" activeClassName="active">About</Button>
        <Button color="inherit" component={NavLink} to="/contact" className="navLink" activeClassName="active">Contact</Button>
        {isAuthenticated ? (
          <>
            <Button color="inherit" onClick={() => logout(() => window.location.reload())} className="navLink">Sign Out</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={NavLink} to="/signup" className="navLink" activeClassName="active">Sign Up</Button>
          </>
        )}
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
        {isAuthenticated ? (
            <>
                <IconButton color="inherit" component={NavLink} to="/profile">
          <AccountCircleTwoToneIcon />
        </IconButton>
        <IconButton color="inherit" component={NavLink} to="/favourites">
          <FavoriteTwoToneIcon />
        </IconButton>
        <IconButton color="inherit" component={NavLink} to="/card">
          <ShoppingCartTwoToneIcon />
        </IconButton>
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