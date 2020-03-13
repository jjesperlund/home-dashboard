import React from 'react'
import moment from 'moment'
import "moment-timezone";
/**
 * Updates every second
 */
export default class Clock extends React.Component {
constructor(props) {
    super(props);
        this.state = {date: moment()};
        this.textStyle = {
            fontSize: props.size + 'pt',
            margin: 0
        };
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
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
    render() {
        return (
            <div>
                <p style={this.textStyle}>
                    {this.state.date.tz(this.props.timezone).format('HH:mm')}
                </p>
            </div>
        );
    }
}