import React from 'react'
import moment from 'moment'
/**
 * Updates every minute
 */
export default class DateViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: moment()};
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            60 * 1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date: moment()
        });
    }
    getWeekdayName() {
        return this.state.date.format('dddd');
    }
    getMonthName() {
        return this.state.date.format('MMMM');
    }
    getDateNumber() {
        return this.state.date.format('Do');
    }
    render() {
        return (
            <div>
                <h4>{this.getWeekdayName()}, {this.getMonthName()} {this.getDateNumber()}.</h4>
            </div>
        );
    }
}