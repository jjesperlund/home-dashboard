import React from 'react'
import Grid from '@material-ui/core/Grid';
import CurrentWeather from './CurrentWeather'
import ForcastWeather from './ForcastWeather'

const boxStyle = {
    backgroundColor: 'rgba(48, 48, 48, 0)',
    borderRadius: '7px',
    zIndex: 1,
  }

export default class WeatherContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
               <Grid container spacing={1}>
                   <Grid item xs={2} />
                    <Grid item xs={10} style={boxStyle}>
                        <CurrentWeather />
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={10} style={boxStyle}>
                        <ForcastWeather />
                    </Grid>
                </Grid>
            </div>
        );
    }
}