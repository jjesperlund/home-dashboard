import React from 'react'
import moment from 'moment'
import Grid from '@material-ui/core/Grid';

import API_KEY from '../utils/open-weather-api'
import Sun from './icons/Sun'
import Clouds from './icons/Clouds'
import Moon from './icons/Moon'
import SunnyWind from './icons/SunnyWind'
import Rain from './icons/Rain'
import Thunderstorm from './icons/Thunderstorm'
import Snow from './icons/Snow'

const city = 'Linkoping';
const weatherLogoSize = 60;

const weatherConditions = {
    'Thunderstorm': <Thunderstorm size={weatherLogoSize} />, 
    'Drizzle': <Rain size={weatherLogoSize} />, 
    'Rain': <Rain size={weatherLogoSize} />,
    'Snow': <Snow size={weatherLogoSize} />, 
    'Atmosphere': <Clouds size={weatherLogoSize} />, 
    'Clear': <Sun size={weatherLogoSize} />,
    'ClearWindy': <SunnyWind size={weatherLogoSize} />, 
    'Moon': <Moon size={weatherLogoSize} />,
    'Clouds': <Clouds size={weatherLogoSize} />
};

const style = {
    logo: {textAlign: '-webkit-center'},
    temp: {fontSize: '40pt', marginTop: 0, marginBottom: 0},
    font: {fontSize: '20pt'},
    sunDay: {margin: 0},
    sunDayContainer: {padding: 0},
    container: {paddingRight: '7%'}
}

/**
 * Open Weather API Max calls: 60 per minute
 * Updates every hour
 */

// https://openweathermap.org/current

export default class CurrentWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWeather: {}
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.updateCurrentWeather(),
            60 * 60 * 1000 // one hour
        );
        this.updateCurrentWeather();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateCurrentWeather() {
        this.retreiveData();        
    }

    retreiveData() {
        var xhr = new XMLHttpRequest()

        // callback when the server responds
        xhr.addEventListener('load', () => {
            // return http response
            console.log("CurrentWeather: HTTP response from Open Weather API retreived.");
            this.parseResponse(JSON.parse(xhr.responseText));
        })

        xhr.open('GET', 
                 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid='
                 + API_KEY);

        xhr.send()
    }

    parseResponse(weatherData) {
        const weatherItems = {
            location: weatherData.name,
            date: moment.unix(weatherData.dt),
            weather: weatherData.weather[0].main,
            temp: weatherData.main.temp.toFixed(1), // round to one decimal
            temp_feels_like: weatherData.main.feels_like.toFixed(1), // round to one decimal
            humidity: weatherData.main.humidity,
            wind_speed: weatherData.wind.speed,
            sunrise: moment.unix(weatherData.sys.sunrise),
            sunset: moment.unix(weatherData.sys.sunset)
        };   

        // Update state with new events        
        this.setState({ currentWeather: weatherItems });      
    }

    displayWeatherIcon() {   
        const moderateWind = 8; // m/s
        const sunsetDark = moment(this.state.currentWeather.sunset).add(1, 'hour'); // sunset + 1 hour -> dark
        const now = moment();
        const isAfterSunset = moment(now).isAfter(sunsetDark);
        const isBeforeSunrise = moment().isBefore(this.state.currentWeather.sunrise);

        // Return a moon if it is night
        if (isAfterSunset || isBeforeSunrise) {
            return weatherConditions.Moon;
        }

        // Special case: decide which "clear" icon to return
        if (this.state.currentWeather.weather == 'Clear') {
            if (this.state.currentWeather.wind_speed > moderateWind) {
                return weatherConditions.ClearWindy;
            }
        }

        return weatherConditions[this.state.currentWeather.weather];
    }
    
    render() {
        /*            
            CURRENT WEATHER DATA:
            name
            weather.main (clouds, sunny, etc..)
            main.temp
            main.feels_like (degrees)
            main.humidity (%)
            wind.speed
            sys.sunrise, sys.sunset (unix timestamp)

        */
        return (
            <div style={style.font}>
                <Grid container spacing={1} style={style.container}>
                    <Grid item xs={1} />
                    <Grid item xs={5} style={style.sunDayContainer}>
                        <p style={style.sunDay}>
                            &#x2197; {moment(this.state.currentWeather.sunrise).format('HH:ss')}
                        </p>
                        <p style={style.sunDay}>
                            &#x2198; {moment(this.state.currentWeather.sunset).format('HH:ss')}
                        </p>
                    </Grid>
                    <Grid item xs={2} style={style.logo}>
                        {this.displayWeatherIcon()}
                    </Grid>
                    <Grid item xs={4}>
                        <p style={style.temp}>{this.state.currentWeather.temp}&#176;</p>
                    </Grid>
                </Grid>
            
                {/* <p>&#x21DC; {this.state.currentWeather.wind_speed} m/s</p> */}
               
            </div>
        );
    }
}