import React, { useEffect, useState } from 'react';
import Search from './Search';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRequest from './hooks/useRequest';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

const Weather = () => {
    const [searchResults, setSearchResults]= useState('Montreal');

    const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${searchResults}&days=10&aqi=no&alerts=no`;  
        
        const{data} = useRequest(url);
        return (
            <div className='App'>
                <ToastContainer />
                <h2 style={{ margin: '30px 0px' }}>Weather</h2>
                {Object.keys(data).length !==0 && (
                    <>
                <Search setSearchResults={setSearchResults} />
                <CurrentWeather data={data} />
                <Forecast data={data} />
                </>
                )}
            </div>
            
        )
}

export default Weather