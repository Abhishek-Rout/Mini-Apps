import styles from "./WeatherApp.module.scss";
import { useState } from "react";

const api = {
    base: import.meta.env.VITE_WEATHER_API_URL,
    key: import.meta.env.VITE_WEATHER_API_KEY,
};

/**
 * 
 * const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
 * const dayInAWeek = new Date().getDay();
 * const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
 * 01d||01n clear 02
 * 
 * 
 * TODO: Forecast mapping
 */

function WeatherApp() {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});

    /*
      Search button is pressed. Make a fetch call to the Open Weather Map API.
    */
    const searchPressed = () => {
        fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                if(result !== '' || result !== null)
                    setWeather(result);
                console.log(result);
            });

            fetch(`${api.base}forecast?q=${search}&units=metric&appid=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
            });
    };

    return (
        <div className={styles.App}>
            <header className={styles.App_header}>
                {/* HEADER  */}
                <h1>Weather App</h1>

                {/* Search Box - Input + Button  */}
                <div>
                    <input
                        type="text"
                        placeholder="Enter city/town..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={searchPressed}>Search</button>
                </div>

                {/* If weather is not undefined display results from API */}
                {typeof weather.main !== "undefined" ? (
                    <div>
                        {/* Location  */}
                        <p>{weather.name}</p>

                        {/* Temperature Celsius  */}
                        <p>{weather.main.temp}°C</p>

                        {/* Condition (Sunny ) */}
                        <p>{weather.weather[0].main}</p>
                        <p>({weather.weather[0].description})</p>
                    </div>
                ) : (
                    ""
                )}
            </header>
        </div>
    );
}

export default WeatherApp;