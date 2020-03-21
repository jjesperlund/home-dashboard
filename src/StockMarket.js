import React from 'react'
import Grid from '@material-ui/core/Grid';

export default class StockMarket extends React.Component {
    constructor(props) {
        super(props);      
    }

    componentWillMount() {
        const script = document.createElement("script");

        script.src = './utils/trading-view';
        script.async = true;

        document.body.appendChild(script);
    }

    render() {
        console.log(window)
        return (               
            <div>
                <div className="tradingview-widget-container">
                    <div id="tradingview_2c91b"></div>
                    <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-NDAQ/" rel="noopener" target="_blank"><span className="blue-text">NDAQ Chart</span></a> by TradingView</div>
                    {/*
                        new window.TradingView.widget(
                            {
                            "autosize": true,
                            "symbol": "NASDAQ:NDAQ",
                            "interval": "15",
                            "timezone": "Etc/UTC",
                            "theme": "dark",
                            "style": "3",
                            "locale": "en",
                            "toolbar_bg": "#f1f3f6",
                            "enable_publishing": false,
                            "hide_top_toolbar": true,
                            "allow_symbol_change": true,
                            "save_image": false,
                            "container_id": "tradingview_2c91b"
                        })
                    */}
                </div>
            </div>
        );
    }
}