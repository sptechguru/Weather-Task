import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ENDPOINTS } from '../Api/Endpoints';
import '.././App.css';


const Weather = () => {
    const [city, setCity] = useState('Indore');
    const [weatherData, newWetherData] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllweather();
    }, []);

    const getAllweather = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${ENDPOINTS.ApiBaseUrl}${city}&units=metric&appid=${ENDPOINTS.WeatherKey}`);
            // console.log('weather appp....', response.data);
            newWetherData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
            // console.log('401 error ......',error.response.data.message)
            setLoading(false);
        }
    }

    return (
        <>
            <div className="container">
                <div className="text-center py-3">{loading ?
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div> : null}
                </div>

                {error && <div className="error_messge">{error}

                </div>}

                <h1 className="heading">Weather App</h1>
                <input
                    className="form-control mr-sm-2"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <br />
                <div className="text-center">
                    <button className="btn btn-primary btn-md" onClick={getAllweather}>Search City </button>
                </div>
                <br />


                {/* display weather */}

                {Object.keys(weatherData).length > 0 &&
                    <div className="col-md-12 text-center">

                        <div className="shadow rounded wetherResultBox">
                            <img className="weathorIcon"
                                src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />

                            <h5 className="weathorCity">{weatherData?.name} </h5>

                            <h6 className="weatherText"> Temperature {((weatherData?.main?.temp) - 273.15).toFixed(2)}°C</h6>

                            <div class="d-flex flex-row py-3">
                                <div class="p-2">
                                    <h6 className="weathorTemp"> Feels's Like {((weatherData?.main?.feels_like) - 273.15).toFixed(2)}°C</h6>
                                </div>
                                <div class="p-2">
                                    <h6 className="weathorTemp"> Pressure : {((weatherData?.main?.pressure))}°C</h6>
                                </div>
                                <div class="p-2">
                                    <h6 className="weathorTemp"> Temp Max : {((weatherData?.main?.temp_max)).toFixed(2)}°C</h6>
                                </div>

                                <div class="p-2">
                                    <h6 className="weathorTemp"> Temp Min : {((weatherData?.main?.temp_max)).toFixed(2)}°C</h6>
                                </div>

                            </div>


                            <div class="d-flex flex-row-reverse mx-5">

                                <div class="p-2">
                                    <h3 className="weathorTemp"> Humidity : {((weatherData?.main?.humidity) - 273.15).toFixed(2)}°C</h3>
                                </div>

                                <div class="p-2">
                                    <h3 className="weathorTemp"> Degree : {((weatherData?.wind?.deg) - 273.15).toFixed(2)}°C</h3>
                                </div>

                                <div class="p-2">

                                    <h3 className="weathorTemp"> Speed : {((weatherData?.wind?.speed) - 273.15).toFixed(2)}°C</h3>
                                </div>
                            </div>

                            <div className="text-center">

                                {
                                    weatherData.weather.map((item, index) => {
                                        return (
                                            <div className="py-3" key={index}>
                                                <h6 className="weathorCity">{item.main}</h6>
                                                <h3 className="text-primary font-weight-bold"> Description :{item.description}</h3>
                                            </div>
                                        );
                                    })
                                }

                            </div>
                        </div>
                    </div>
                }

            </div>

        </>
    );
}

export default Weather;
