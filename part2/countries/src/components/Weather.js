import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {

    const api_key = process.env.REACT_APP_API_KEY
    console.log(api_key)

    const api_call = 'http://api.weatherstack.com/current?access_key='+ api_key + '&query=' + city + '&units=m'
    console.log(api_call)

    const [weather, setWeather] = useState({})


    useEffect(() => {
        console.log('country effect')
        axios
          .get(api_call)
          .then(response => {
            console.log('promise fulfilled')
            setWeather(response.data)
            console.log(response.data)
          })
      }, [])


    const hasBeenLoaded = () => weather.current ? true : false


    return hasBeenLoaded() ? (
        <div>
            <li>Temperature: {weather.current.temperature}</li>
            <li>Wind: {weather.current.wind_speed} km/h to direction {weather.current.wind_dir}</li>
            <img alt="hello" src={weather.current.weather_icons[0]} />

        </div>
    ) : (<></>)

}

export default Weather
