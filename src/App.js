// https://material-ui.com/getting-started/usage/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateContainer from './DateContainer'
import CalendarViewer from './CalendarViewer'
import WeatherContainer from './weather/WeatherContainer'
import StockMarket from './StockMarket'
import NewsViewer from './news/NewsViewer'

import './App.css';

const TradingView = window.tv;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  }
}));

const bottom = {
  paddingTop: '4%'
}

const style = {
  headerMedium: {margin: '2%', fontWeight: 100, fontSize: '20pt'}
}

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <div className={classes.root}>
          <Grid container spacing={1}>
            <DateContainer />
            <Grid item xs={8} style={bottom}>
              <WeatherContainer />
            </Grid>
            <Grid item xs={4} style={bottom}>
            {/*
            <div style={boxStyle}>
              <h1>Box</h1> 
              <StockMarket />

            </div>
            */}
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <CalendarViewer />
              </Grid>
              <Grid item xs={6}>
                <p>Latest News</p>
                  <NewsViewer />
              </Grid>
            </Grid>
          </Grid>
        </div>

      </header>
    </div>
  );
}

export default App;
