import React from 'react'
import styled from 'styled-components'
const CurrentWeather = ({data}) => {
    return (
        <StyledCurrentWeather>
            <div className='current-weather box-shadow'>
                <img src={data.current.condition.icon} alt="icon" />
                <h1>{data.current.temp_c}°C</h1>

                <div className='content'>
                    <h5>Precipitation: {data.current.precip_in}</h5>
                    <h5>Wind speed : {data.current.wind_kph}</h5>
                </div>
            </div>
            <div className='location box-shadow'>
                <h5>Date: {data.location.localtime}</h5>
                <h2>{data.location.name}</h2>
                <h3>{data.location.region}</h3>
                <h4>{data.location.country}</h4>
                
            </div>
        </StyledCurrentWeather>
    )
}
const StyledCurrentWeather = styled.div`
display: flex;
justify-content: space-between;
.current-weather{
display: flex;
justify-content: space-between;
align-items: center;
width: 400px;
padding: 20px;
img{
    width: 80px;
    height: 80px;
}
h1{
    font-size: 3rem;
}
.content{
    h5{
        font-weight: normal;
    }
}
}
.location{
    width: 350px;
    padding:20px;
    h2{
        text-align: right;
        font-size: 1rem;
        margin-bottom: 10px;
    }
    h3{
        text-align: right;
        font-size: .8rem;
        margin-bottom: 10px;
    }
    h4{
        text-align: right;
        font-size: .8rem;
        margin-bottom: 10px;
        font-weight: 500;
    }


}
.box-shadow{
    box-shadow: 1px 0px 24px 0px rgba(100,100,100,0.75);
-webkit-box-shadow: 1px 0px 24px 0px rgba(100,100,100,0.75);
-moz-box-shadow: 1px 0px 24px 0px rgba(100,100,100,0.75);
border-radius: 15px;
}
`;

export default CurrentWeather