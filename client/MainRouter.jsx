import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Nav from './components/Nav/Nav.jsx';
import Signup from './components/Signup/Signup.jsx';
import Signin from './components/Signin/Signin.jsx';
import Footer from './components/Footer/Footer.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import Profile from './components/Profile/Profile.jsx';
import NewListing from './components/NewListing/NewListing.jsx';
import Cart from './components/Cart/Cart.jsx';

const MainRouter = () => {
    return (
        <div>
            <Nav />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/signin" element={<Signin />} />
                <Route exact path='*' element={<NotFound/>}/>
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/newListing" element={<NewListing />} />
                <Route exact path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default MainRouter;