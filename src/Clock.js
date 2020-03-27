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
        this.style = {
            textStyle: {fontSize: props.size + 'pt', margin: 0 },
            seconds: {fontSize: props.size - 60 + 'pt', position: 'absolute', paddingTop: '1.4%'}
        };
        this.displaySeconds = props.seconds;
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
                <p style={this.style.textStyle}>
                    {this.state.date.tz(this.props.timezone).format('HH:mm')}
                    {this.displaySeconds == "true" && (
                        <sup style={this.style.seconds}>
                            {this.state.date.tz(this.props.timezone).format('ss')}
                        </sup>
                    )}
                </p>
            </div>
        );
    }
}