import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ENDPOINTS } from '../Api/Endpoints';
import '.././App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Weather = () => {
    const [city, setCity] = useState('Bengaluru');
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
            console.log('weather appp....', response.data);
            newWetherData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
            toast.error(error.response.data.message);
            // console.log('401 error ......',error.response.data.message)
            setLoading(false);
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="container-fluid">
                <div className="container py-5">
                    <div className="text-center">{loading ?
                        <div className="spinner-border text-white" role="status">
                            <span className="sr-only"></span>
                        </div> : null}
                    </div>

                    <div className="row gx-5">
                        <div className="col-md-4 col-lg-4 col-12 card text-center search_left">
                            <div className="py-5 mb-5">
                                <h1 className="">Weather by city</h1>
                                <p className="">Please enter the city name</p>
                                <div className="py-3">
                                    <input
                                        className="form-control mr-sm-2"
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="Enter city name"
                                    />
                                </div>
                                <div className="py-2">
                                    <button className="btn btn-primary btn-md btn-block" onClick={getAllweather}>Get Weather </button>
                                </div>
                            </div>
                        </div>

                        {
                            Object.keys(weatherData).length > 0 &&
                        <div className="col-md-7 col-lg-7 col-12 text-center card  mx-5">
                            <div class="card-body head city_Section">
                                <div class="card-body center right text-center">
                                {
                                        weatherData.weather.map((item, index) => {
                                            return (
                                                <div className="py-3" key={index}>
                                                    <h6 className="weathorCity">{item.main}</h6>
                                                 {/* <h3 className="weathorCity font-weight-bold"> Description :{item.description}</h3>  */}
                                                </div>
                                            );
                                        })
                                    }
                                    <img alt="" className="img-fluid img-responsive" src="http://openweathermap.org/img/w/04d.png" />
                                    <h1 class="card-text">{((weatherData?.main?.pressure) - 273.15).toFixed(2)} ℉</h1>
                                </div>
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Weather Details for city : {weatherData?.name}</h5>
                                <table class="table py-2">
                                    <tbody>
                                        <tr>
                                            <td>Temperature </td>
                                            <td>:{((weatherData?.main?.temp) - 273.15).toFixed(2)} ℉</td>

                                            <td>Temperature Min </td>
                                            <td>:{((weatherData?.main?.temp_min) - 273.15).toFixed(2)} ℉</td>
                                        </tr>
                                        <tr>
                                            <td >Feels like </td>
                                            <td>:{((weatherData?.main?.feels_like) - 273.15).toFixed(2)}°F </td>
                                            <td >Pressure </td>
                                            <td>:{((weatherData?.main?.pressure))}°C</td>
                                        </tr>
                                        <tr>
                                            <td>Himudity </td>
                                            <td>: {((weatherData?.main?.humidity) - 273.15).toFixed(2)}</td>
                                            <td>Wind </td>
                                            <td>: {((weatherData?.wind?.speed))} Mph</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>

                        }

                    </div>
                </div>
            </div>

        </>
    );
}

export default Weather;
