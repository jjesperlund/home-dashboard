import React from 'react';

import Grid from '@material-ui/core/Grid';
import Clock from './Clock'
import DateViewer from './DateViewer'

import './DateContainer.css'

const style = {
 textStyle: {margin: 0, fontSize: '27pt', textAlign: 'left', paddingTop: '4%'},
 container: {paddingTop: '5%', zIndex: 1},
 videoPlayer: {
     height: '60vh',
     width: '100%',
     overflow: 'hidden',
     position: 'absolute',
     marginTop: '-30%',
     opacity: '0.5'
 },
 moveToFront: {zIndex: 1},
 paddingAll: {paddingTop: '3%'},
 paddingMainClock: {textAlign: 'left', paddingLeft: '9%'},
 paddingWorldClock: {paddingTop: '4%'},
 worldClockContainer: {paddingLeft: '10%'}
};

export default class DateContainer extends React.Component {
    render() {
        return (
            <Grid item xs={12}>
                <div>
                    <Grid container spacing={1} style={style.paddingAll} direction="column">
                        {/*
                        <video autoPlay loop muted type="video/mp4" style={style.videoPlayer}>
                            <source src="/content/blur.mp4" />
                        </video>
                        */}
                        <Grid item xs={12} style={style.paddingMainClock}>
                            <Clock timezone="Europe/Stockholm" size="80" seconds="true"/>
                            <DateViewer />
                        </Grid>
                        <Grid item xs={12} style={style.worldClockContainer}>
                            <Grid container spacing={2} style={style.paddingWorldClock}>
                                <Grid item xs={2} style={style.moveToFront}>
                                    <p style={style.textStyle}>BKK</p>
                                </Grid>
                                <Grid item xs={4} style={style.moveToFront}>
                                    <Clock timezone="Asia/Bangkok" size="30" seconds="false"/>
                                </Grid>
                                <Grid item xs={6} />
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={2} style={style.moveToFront}>
                                    <p style={style.textStyle}>LA</p>
                                </Grid>
                                <Grid item xs={4} style={style.moveToFront}>
                                    <Clock timezone="America/Los_Angeles" size="30" seconds="false"/>
                                </Grid>
                                <Grid item xs={6} />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
           
        );
    }
}