import React, { useEffect, useState } from 'react';
//import useStyles from './styles';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Navbar.css';
import styled from 'styled-components';

const Navbar = () => {
    //const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //console.log(user);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        //check for the token if it exists
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        //check for json web token
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]); // when location changes set the user

    const logout = () => {
        dispatch({ type: 'LOGOUT'});
        // when we logout we redirect to the main page
        navigate('/auth');
        setUser(null);
    }

    return (
        <div className="appBar" position='static' color='inherit'>
        
            <div className="brandContainer">
                <Link  to="/" className="heading">
                Places
                </Link>
                <WeatherLink exact to="/weather" className='weather'>Weather</WeatherLink>
            </div>
            
            <div className="toolbar">
                {user?.result ? (
                <div className="profile" >
                    <h3 className="purple" alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</h3>
                    <h3 className="userName" >{user?.result.name}</h3>
                    
                    <button variant="contained" className="logout" onClick={logout}>Logout</button>
                </div>
                ) : (
                    <Link className="signin"  to="/auth" variant="contained" color="primary">Sign In</Link>
                    
                )}
            </div>
        </div>
    );
};


const WeatherLink = styled(Link)`
text-decoration: none;
color: blue;
font-weight: bold;
margin-top: 10px;
margin-left: 10px;

`
export default Navbar