import React from 'react';

import Grid from '@material-ui/core/Grid';
import Clock from './Clock'
import DateViewer from './DateViewer'

import './DateContainer.css'

const style = {
 textStyle: {margin: 0, fontSize: '20pt', textAlign: 'right'},
 container: {paddingTop: '5%', zIndex: 1},
 videoPlayer: {
     height: '40vh',
     width: '100%',
     overflow: 'hidden',
     position: 'absolute',
     marginTop: '-10%',
     opacity: '0.5'
 },
 moveToFront: {zIndex: 1}
};

export default class DateContainer extends React.Component {
    render() {
        return (
            <Grid item xs={12}>
                <div>
                    <Grid container spacing={1}>

                        <video autoPlay loop muted type="video/mp4" style={style.videoPlayer}>
                            <source src="/content/bridge.mp4" />
                        </video>
                        <Grid item xs={6} style={style.moveToFront}>
                            <Clock timezone="Europe/Stockholm" size="60"/>
                            <DateViewer />
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={2} style={style.container}>
                                <Grid item xs={6} style={style.moveToFront}>
                                    <p style={style.textStyle}>BKK</p>
                                </Grid>
                                <Grid item xs={6} style={style.moveToFront}>
                                    <Clock timezone="Asia/Bangkok" size="22"/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6} style={style.moveToFront}>
                                    <p style={style.textStyle}>LA</p>
                                </Grid>
                                <Grid item xs={6} style={style.moveToFront}>
                                    <Clock timezone="America/Los_Angeles" size="22"/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
           
        );
    }
}