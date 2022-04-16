import React from 'react';

import Weather from './Weather';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import places from './images/places.png';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
    
    return (
        <BrowserRouter>
            <Container maxWidth='lg'>
                <Navbar/>
                <Routes>
                    <Route path="/" exact element={<Home/>} />
                    <Route path="/auth" exact element={<Auth />} />
                    <Route path="/weather" exact element={<Weather />}> Weather</Route>
                </Routes>
                
                
            </Container>
        {/* <Weather exact to="/weather" /> */}
        </BrowserRouter>
    )
}


export default App