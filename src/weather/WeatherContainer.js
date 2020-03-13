import React from 'react'
import Grid from '@material-ui/core/Grid';
import CurrentWeather from './CurrentWeather'
import ForcastWeather from './ForcastWeather'

const boxStyle = {
    border: '2px solid red',
  }

export default class WeatherContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
               <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <div style={boxStyle}>
                            <CurrentWeather />
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <ForcastWeather />
                    </Grid>
                </Grid>
            </div>
        );
    }
}