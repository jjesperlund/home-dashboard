import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import "moment-timezone";
import API_KEY from './utils/google-calendar-api'

// change timeMin to moment() in correct format
// limit 1,000,000 queries per day
// https://www.googleapis.com/calendar/v3/calendars/pucmdvv6j7fc64134iko1m5tikogf0vt%40import.calendar.google.com/events?orderBy=startTime&singleEvents=true&timeMin=2020-03-09T00%3A00%3A00Z&key=AIzaSyACLULMDg-fww_3dBDwU-0ERXGMrHcTfHQ

const localizer = momentLocalizer(moment);

const style = {
    calendarContainer: {
        textAlign: 'center',
        width: '100%',
        padding: '3%',
        backgroundColor: '#383838',
        borderRadius: '7px',
        zIndex: 1,
        opacity: 0.8
          
    },
    calendar: {
        height: '55vh',
        fontSize: 15,
        zIndex: 2
    }
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

    render() {
        console.log(this.state.events)
        return (
            <div style={style.calendarContainer}>
                <Calendar
                localizer={localizer}
                toolbar={false}
                events={this.state.events}
                defaultDate={new Date()}
                defaultView="agenda"
                style={style.calendar}
                />
            </div>
        );
    }
}