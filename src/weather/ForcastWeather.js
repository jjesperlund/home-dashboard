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

const weatherLogoSize = 60;

const style = {
    logo: {textAlign: '-webkit-center'},
    day: {fontSize: '20pt', margin: 0},
    font: {fontSize: '17pt'}
}

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

const arrayAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
const arrayMin = arr => Math.min(...arr);
const arrayMax = arr => Math.max(...arr);

/**
 * Open Weather API Max calls: 60 per minute
 */
export default class ForcastWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherItems: [], // Two elements where 0: tomorrow, 1: day after tomorrow
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.updateWeatherItems(),
            60 * 60 * 1000 // one hour
        );
        this.updateWeatherItems();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateWeatherItems() {
        this.retrieveEvents();        
    }

    retrieveEvents() {
        var xhr = new XMLHttpRequest()

        // callback when the server responds
        xhr.addEventListener('load', () => {
            // return http response
            console.log("retreiveEvents: HTTP response from Open Weather API retreived.");
            this.parseResponse(JSON.parse(xhr.responseText));
        })

        xhr.open('GET', 
                 'http://api.openweathermap.org/data/2.5/forecast?q=Linkoping&units=metric&appid='
                 + API_KEY);

        xhr.send()
    }

    parseResponse(weatherData) {
        let weatherEvents = [];
        let twoDaysForward = moment().add(2, 'days');
        let allItems = weatherData.list;
        
        let dayTemps = [],
            humidities = [],
            windSpeeds = [],
            weatherCondition = '',
            weatherConditionDescription = '',
            amountClouds = '';

        for (let i = 0; i < allItems.length - 1; i++) {
            let item = allItems[i];
            let nextItem = allItems[i + 1];

            let currentItemDay = moment.unix(item.dt);
            let nextItemDay = moment.unix(nextItem.dt);

            // Skip if current item's date is today's date
            if (moment(currentItemDay).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
                continue;
            }

            // Exit when two days forward have been parsed
            if (moment(currentItemDay).isAfter(twoDaysForward, 'day')) {
                break;
            }

            dayTemps.push(item.main.temp);
            windSpeeds.push(item.wind.speed);
            humidities.push(item.main.humidity);
            
            // Special case: get parameters at 15:00
            if (moment(currentItemDay).format('HH:ss') == '13:00') {
                weatherCondition = item.weather[0].main;
                weatherConditionDescription = item.weather[0].description;
                amountClouds = item.clouds.all;
            }

            // Check if all items in ONE day have been iterated
            if (moment(nextItemDay).isAfter(currentItemDay, 'day')) {    
                
                // Handle error if weather condition has not been set
                if (weatherCondition == '') {
                    weatherCondition = item.weather[0].main;
                    weatherConditionDescription = item.weather[0].description;
                    amountClouds = item.clouds.all;
                }

                weatherEvents.push({
                    time: currentItemDay,
                    weather: weatherCondition,
                    weather_description: weatherConditionDescription,
                    min_temp: Number(arrayMin(dayTemps).toFixed(1)),
                    max_temp: Number(arrayMax(dayTemps).toFixed(1)),
                    humidity: arrayAvg(humidities),
                    clouds_percentage: amountClouds,
                    wind_speed: Number(arrayAvg(windSpeeds).toFixed(1)) // round to one decimal
                });

                // Reset variables needed in each iteration
                dayTemps = [];
                humidities = [];
                windSpeeds = [];
                weatherCondition = '';
                weatherConditionDescription = '';
                amountClouds = '';
            }

        }

        // Update state with new events
        this.setState({weatherItems: weatherEvents});

    }

    displayWeatherIcon(item) {   
        if (typeof item === 'undefined') return;

        const moderateWind = 8; // m/s
        // Special case: decide which "clear" icon to return
        if (item.weather == 'Clear') {
            if (item.wind_speed > moderateWind) {
                return weatherConditions.ClearWindy;
            }
        }

        return weatherConditions[item.weather];
    }

    getWeekdayName(item) {
        return item.format('dddd');
    }

    render() {
        /*
            FORECAST DATA:
            list.dt (unix timestamp)
            list.humidity (%)
            list.clouds (percentage of clouds)
            list.speed (m/s)
            list.weather.main
            list.weather.description
        */

       // Do not render until HTTP response have been fetched
       if (this.state.weatherItems.length == 0) return null;
       
       return (
            <div style={style.font}>
                {/* Weather icons */}

                <Grid container spacing={1}>
                    <Grid item xs={6} style={style.logo}>
                        {this.displayWeatherIcon(this.state.weatherItems[0])}
                    </Grid>
                    <Grid item xs={6}>
                        {this.displayWeatherIcon(this.state.weatherItems[1])}
                    </Grid>
                </Grid>

                {/* Which day */}
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <p style={style.day}>Tomorrow</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p style={style.day}>
                            {this.getWeekdayName(this.state.weatherItems[1].time)}
                        </p>
                    </Grid>
                </Grid>    

                {/* Max/min temp */}             
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        {this.state.weatherItems[0].max_temp}/{this.state.weatherItems[0].min_temp}&#176;
                    </Grid>
                    <Grid item xs={6}>
                        {this.state.weatherItems[1].max_temp}/{this.state.weatherItems[1].min_temp}&#176;
                    </Grid>
                </Grid>  

            </div>
        );
    }
}