import React from 'react';

import Grid from '@material-ui/core/Grid';
import Clock from './Clock'
import DateViewer from './DateViewer'

import './DateContainer.css'

const style = {
 textStyle: {margin: 0, fontSize: '20pt', textAlign: 'right'},
 container: {paddingTop: '5%'}
};

export default class DateContainer extends React.Component {
    render() {
        return (
            <Grid item xs={12}>
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Clock timezone="Europe/Stockholm" size="70"/>
                            <DateViewer />
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={2} style={style.container}>
                                <Grid item xs={6}>
                                    <p style={style.textStyle}>BKK</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <Clock timezone="Asia/Bangkok" size="22"/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <p style={style.textStyle}>LA</p>
                                </Grid>
                                <Grid item xs={6}>
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