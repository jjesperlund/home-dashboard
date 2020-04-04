import React from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import "moment-timezone";
import API_KEY from './utils/google-calendar-api'

// limit 1,000,000 queries per day

const style = {
    calendarContainer: {
        textAlign: 'center',
        width: '100%',
        padding: '3%',
        backgroundColor: '#383838',
        borderRadius: '7px',
        zIndex: 1,          
    },
    calendar: {
        height: '55vh',
        fontSize: 15,
        zIndex: 2
    },
    date: {margin: '2%', fontSize: '26pt'},
    day: {margin: '2%', fontSize: '15pt'},
    time: {margin: '1%', fontSize: '17pt'},
    title: {margin: '1%', fontSize: '23pt'},
    boxStyle: {
        backgroundColor: 'rgba(10, 10, 10, 0.4)',
        borderLeft: '5px solid red',
        borderRadius: '7px',
        zIndex: 1,
        textAlign: 'center',
        margin: '1% 0%'
    },
    item: {margin: '2% 0%'}
}
/**
 * Component updates every minute
 */
export default class CalendarViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.updateCalendarEvents(),
            60 * 1000
        );
        this.updateCalendarEvents();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateCalendarEvents() {
        const date = moment().format('YYYY-MM-DDT');
        this.retrieveEvents(date);        
    }

    retrieveEvents(date) {
        var xhr = new XMLHttpRequest()

        // callback when the server responds
        xhr.addEventListener('load', () => {
            // return http response
            console.log("retreiveEvents: HTTP response from Google Calendar API retreived.");
            this.parseResponse(JSON.parse(xhr.responseText));
        })

        xhr.open('GET', 
                 'https://www.googleapis.com/calendar/v3/calendars' +
                 '/pucmdvv6j7fc64134iko1m5tikogf0vt%40import.calendar.google.com' + 
                 '/events?orderBy=startTime&singleEvents=true&timeMin='+ date + 
                 '00:00:00Z&key=' + API_KEY);

        xhr.send()
    }

    parseResponse(eventData) {
        let calendarEvents = [];
        let oneMonthForward = moment().add(1, 'months');
        let allEvents = eventData.items;

        // Iterate the events and parse data
        for (let i = 0; i < allEvents.length; i++) {
            let event = allEvents[i];

            // Check if full day event (different prop name)
            let currentStartDate, currentEndDate;
            if (event.start.date) {
                // full day event
                currentStartDate = moment(event.start.date);
                currentEndDate = moment(event.end.date);
            } else {
                // non-full day event
                currentStartDate = moment(event.start.dateTime);
                currentEndDate = moment(event.end.dateTime);
            }

            // Exit if currentStartDate is out of display range (one month forward)
            if (currentStartDate.isAfter(oneMonthForward)) {
                console.log("parseResponse: Exited for loop at event " + i);
                break;
            }
        
            calendarEvents.push({
                start: currentStartDate,
                end: currentEndDate,
                title: event.summary,
                description: event.description ? event.description : '',
                location: event.location ? event.location : ''
            });
        }

        // Update state with new events
        this.setState({ events: calendarEvents });

    }

    countEventsPerDay() {
        let currentItemDay, currentItem, nextItem;
        let occurrences = [];
        let numOccurrences = 1;

        for(let i = 0; i < this.state.events.length - 1; i++) {

            currentItem = this.state.events[i];
            nextItem = this.state.events[i + 1];
            currentItemDay = moment(currentItem.start);

            // Check if next item is not the same day as current
            if (moment(nextItem.start).isAfter(currentItemDay, 'day')) {
                occurrences.push({
                    date: currentItemDay,
                    occurrences: numOccurrences
                });
                numOccurrences = 1;
            } else {
                numOccurrences++;
            }
        }
        return occurrences;
    }

    renderItems(numDays) {
        let output = [];
        let key = 0;
        let occurrences = this.countEventsPerDay();
        console.log(occurrences)
        let eventsInDay;
        for (let j = 0; j < numDays; j++) {
            let event = this.state.events[j];

            if (!event) continue;

            eventsInDay = occurrences.find(element => moment(element.date).isSame(event.start, 'day'));
            
            // Add several calendar items for one day if present
            let items = [];
            if (eventsInDay) {
                for (let i = 0; i < eventsInDay.occurrences; i++) {
                    items.push(
                        <Grid item xs={12} style={style.boxStyle}>
                            <Grid container spacing={1}>
                                <Grid item xs={2}>
                                    <p style={style.time}>{moment(event.start).format('HH:mm')}</p>
                                </Grid>
                                <Grid item xs={10}>
                                    <p style={style.title}>{event.title}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                }
            }

            output.push(
                <Grid key={key} container spacing={1} style={style.item}>
                    <Grid item xs={2}>
                        <p style={style.date}>{moment(event.start).format('D')}</p>
                        <p style={style.day}>{moment(event.start).format('ddd')}</p>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container spacing={1}>
                            {items}
                        </Grid>
                    </Grid>
                </Grid>);

            key++;
        }
        return output;
    }

    render() {
        return (
            <div>
                <Grid container spacing={1}>
                    {this.renderItems(5)}
                </Grid>
            </div>
        );
    }
}