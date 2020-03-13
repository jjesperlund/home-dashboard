// https://material-ui.com/getting-started/usage/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateContainer from './DateContainer'
import CalendarViewer from './CalendarViewer'
import WeatherContainer from './weather/WeatherContainer'

import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  }
}));

const boxStyle = {
  border: '2px solid blue',
  textAlign: 'center',
  height: '100%',
}

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <div className={classes.root}>
          <Grid container spacing={1}>
            <DateContainer />
            <Grid item xs={8}>
              <div style={boxStyle}><WeatherContainer /></div>
            </Grid>
            <Grid item xs={4}>
            <div style={boxStyle}>
              <div style={boxStyle}><h1>Box</h1></div>
            </div>
            </Grid>
            <Grid container spacing={1}>
              <CalendarViewer />
            </Grid>
          </Grid>
        </div>

      </header>
    </div>
  );
}

export default App;
