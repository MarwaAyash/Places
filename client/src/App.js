import React from 'react';

import Weather from './Weather';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
// import places from './images/places.png';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';



const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <Container maxWidth='lg'>
                <Navbar/>
                <Routes>
                    {/* <Route path="/" exact element={<Home/>} /> */}
                    <Route path="/" exact element={<Navigate to="/posts" />} />
                    <Route path='/posts' exact element={<Home />}/>
                    <Route path='/posts/search' exact element={<Home />}/>
                    <Route path='/posts/:id' element={<PostDetails />} />
                    <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to='/posts' />} />
                    <Route path="/weather" exact element={<Weather />}> Weather</Route>
                </Routes>
                
                
            </Container>
        
        </BrowserRouter>
    )
}


export default App