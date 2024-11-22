import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Nav from './components/Nav/Nav.jsx';
import Signup from './components/Signup/Signup.jsx';
import Footer from './components/Footer/Footer.jsx';

const MainRouter = () => {
    return (
        <div>
            <Nav />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signup" element={<Signup />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default MainRouter;