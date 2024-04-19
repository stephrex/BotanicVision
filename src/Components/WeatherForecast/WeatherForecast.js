import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherForecast.css'

const WeatherForecast = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sunriseTime, setSunriseTime] = useState(null);
    const [sunsetTime, setSunsetTime] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:5000/weatherforecast', { 'city': city });
            console.log(response.data);
            setWeatherData(response.data);
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    const get_full_date = (responsedata) => {
        const data = responsedata; //stores props values in data
        const weatherItems = data.weather; //gets the values of weather
        const cityName = data.name;
        const cityMain = data.main;
        // const weatherForecast = data.main.feels_like;
        const weatherIcon = Object.values(weatherItems)
            .map((itm: any) => itm.icon)
            .join("");
        const url = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        //date and time
        const dT = data.dt;
        const time = data.timezone;
        const cityMonth = new Date(dT * 1000 + time * 1000).getMonth();
        const cityTime = new Date(dT * 1000 + time * 1000).getDay();
        const minutes = new Date(dT * 1000 + time * 1000).getMinutes();
        const hours = new Date(dT * 1000 + time * 1000).getHours();
        const cityDate = new Date(dT * 1000 + time * 1000).getDate();
        const cityMinutes = minutes < 10 ? `0` + minutes : minutes;
        const cityHours = hours < 10 ? `0` + hours : hours;
        const timeFormat = cityHours >= 12 ? "PM" : "AM";
        const mainTime = `${cityHours}:${cityMinutes} ${timeFormat}`;
        let val;
        const dayArray = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const day = dayArray[cityTime];
        const monthArray = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const month = monthArray[cityMonth];
        let tempName: any = [];
        let tempValue: any = [];
        let dateSuffix;
        switch (cityDate) {
            case 2:
                dateSuffix = "nd";
                break;
            case 3:
                dateSuffix = "rd";
                break;
            default:
                dateSuffix = "th";
        }
        const fullDate = `${day} ${cityDate + dateSuffix} ${month}`;
        const unicode = "\u00b0";

        const info_array = [fullDate, mainTime]
        return (info_array)
    }

    useEffect(() => {
        if (weatherData) {
            if (weatherData.sys && weatherData.coord) {
                const { sunrise, sunset } = weatherData.sys;
                const { lat, lon } = weatherData.coord;
                const timezoneOffsetSeconds = weatherData.timezone;

                // Convert sunrise and sunset timestamps to local time
                const sunriseLocalTime = new Date((sunrise + timezoneOffsetSeconds) * 1000);
                const sunsetLocalTime = new Date((sunset + timezoneOffsetSeconds) * 1000);

                // Format the time
                const formatTime = (date) => {
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    return `${hours}:${minutes}`;
                };

                setSunriseTime(formatTime(sunriseLocalTime));
                setSunsetTime(formatTime(sunsetLocalTime));
            }
        }
    }, [weatherData]);

    return (
        <div>
            <div className="weather-forecast-container">
                <div className='location_cloud_info'>
                    <div className="image_placeholder_forecast_container" style={{ display: weatherData ? 'none' : 'block' }}></div>
                    {weatherData && (
                        <div>
                            <div id='cloud_icon_container'>
                                <img id='cloud_icon' src='https://cdn-icons-png.flaticon.com/128/1146/1146869.png' />
                            </div>
                            <div id='container_results_data'>
                                <h1 id='weather_data_country'>{weatherData.name}</h1>
                                <h1 id='weather_data_date'>{get_full_date(weatherData)[0]}</h1>
                                <h1 id='weather_data_time'>{get_full_date(weatherData)[1]}</h1>
                            </div>
                        </div>
                    )}
                </div>
                <div className='searchbar_other_info'>
                    <form id='weather_input_field' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Lagos,Nigeria"
                            value={city}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Get Weather</button>
                    </form>
                    <div id='weather_result'>
                        <div id='feels_like'>
                            <div className="image_placeholder_weather_result" style={{ display: weatherData ? 'none' : 'block' }}></div>
                            {weatherData && (
                                <div className='main_result_container'>
                                    <div className='main_result_inner_container'>
                                        <p className='main_result_header'>Feels Like</p>
                                        <p className='main_result'>{Math.round(weatherData.main.feels_like - 273)}°C</p>
                                    </div>
                                    <div className='main_result_img_container'>
                                        <img className='main_result_img' src='https://cdn-icons-png.flaticon.com/128/1684/1684375.png' />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div id='description'>
                            <div className="image_placeholder_weather_result" style={{ display: weatherData ? 'none' : 'block' }}></div>
                            {weatherData && (
                                <div className='main_result_container'>
                                    <div className='main_result_inner_container'>
                                        <p className='main_result_header'>Description</p>
                                        <p className='main_result'>{weatherData.weather[0].description}</p>
                                    </div>
                                    <div className='main_result_img_container'>
                                        <img className='main_result_img' src='https://cdn-icons-png.flaticon.com/128/414/414927.png' />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div id='humidity'>
                            <div className="image_placeholder_weather_result" style={{ display: weatherData ? 'none' : 'block' }}></div>
                            {weatherData && (
                                <div className='main_result_container'>
                                    <div className='main_result_inner_container'>
                                        <p className='main_result_header'>Humidity</p>
                                        <p className='main_result'>{weatherData.main.humidity}%</p>
                                    </div>
                                    <div className='main_result_img_container'>
                                        <img className='main_result_img' src='https://cdn-icons-png.flaticon.com/128/5664/5664993.png' />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div id='wind_speed'>
                            <div className="image_placeholder_weather_result" style={{ display: weatherData ? 'none' : 'block' }}></div>
                            {weatherData && (
                                <div className='main_result_container'>
                                    <div className='main_result_inner_container'>
                                        <p className='main_result_header'>Wind Speed</p>
                                        <p className='main_result'>{weatherData.wind.speed}m/s</p>
                                    </div>
                                    <div className='main_result_img_container'>
                                        <img className='main_result_img' src='https://cdn-icons-png.flaticon.com/128/11214/11214591.png' />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div id='sunset'>
                            <div className="image_placeholder_weather_result" style={{ display: weatherData ? 'none' : 'block' }}></div>
                            {weatherData && (
                                <div className='main_result_container'>
                                    <div className='main_result_inner_container'>
                                        <p className='main_result_header'>Sunset</p>
                                        <p className='main_result'>{sunsetTime}</p>
                                    </div>
                                    <div className='main_result_img_container'>
                                        <img className='main_result_img' src='https://cdn-icons-png.flaticon.com/128/3236/3236899.png' />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div id='sunrise'>
                            <div className="image_placeholder_weather_result" style={{ display: weatherData ? 'none' : 'block' }}></div>
                            {weatherData && (
                                <div className='main_result_container'>
                                    <div className='main_result_inner_container'>
                                        <p className='main_result_header'>Sunset</p>
                                        <p className='main_result'>{sunriseTime}</p>
                                    </div>
                                    <div className='main_result_img_container'>
                                        <img className='main_result_img' src='https://cdn-icons-png.flaticon.com/128/3236/3236899.png' />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default WeatherForecast;