import React from 'react';

import Grid from '@material-ui/core/Grid';
import Clock from './Clock'
import DateViewer from './DateViewer'

import './DateContainer.css'
const section = {
    minHeight: "200px",
    paddingTop: 5,
  };
const textStyle = {
    margin: 0
}

export default class DateContainer extends React.Component {
    render() {
        return (
            <Grid item xs={12}>
                <div style={section}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Clock timezone="Europe/Stockholm" size="80"/>
                            <DateViewer />
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <p style={textStyle}>BKK</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <Clock timezone="Asia/Bangkok" size="40"/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <p style={textStyle}>LA</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <Clock timezone="America/Los_Angeles" size="40"/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
           
        );
    }
}