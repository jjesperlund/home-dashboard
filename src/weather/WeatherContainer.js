import React from 'react'
import Grid from '@material-ui/core/Grid';
import CurrentWeather from './CurrentWeather'
import ForcastWeather from './ForcastWeather'

const boxStyle = {
    backgroundColor: '#303030',
    borderRadius: '7px',
    zIndex: 1,
    opacity: 0.8
  }

export default class WeatherContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
               <Grid container spacing={1}>
                    <Grid item xs={4} style={boxStyle}>
                        <CurrentWeather />
                    </Grid>
                    <Grid item xs={8} style={boxStyle}>
                        <ForcastWeather />
                    </Grid>
                </Grid>
            </div>
        );
    }
}