import React from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import NewsItem from './NewsItem'
import API_KEY from '../utils/news-api'

// limit 500 queries per day

/**
 * Component updates every 10 minutes
 */
export default class NewsViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsItems: []
        }
        this.maxArticles = 5;
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.updateNewsItems(),
            60 * 10 * 1000
        );
        this.updateNewsItems();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateNewsItems() {
        this.retrieveNews();        
    }

    retrieveNews() {
        var xhr = new XMLHttpRequest()

        // callback when the server responds
        xhr.addEventListener('load', () => {
            // return http response
            console.log("retreiveEvents: HTTP response from News API retreived.");
            this.parseResponse(JSON.parse(xhr.responseText));
        })

        xhr.open('GET',
        'http://newsapi.org/v2/top-headlines?country=se&pageSize=' + this.maxArticles + '&apiKey=' + API_KEY);

        xhr.send()
    }

    parseResponse(data) {
        let items = [];
        
        data.articles.forEach(item => {
            items.push({
                published: item.publishedAt,
                source: item.source.name,
                title: item.title,
                description: item.description,
                image: item.urlToImage
            });
        });

        // Update state with new items
        this.setState({ newsItems: items });

    }

    renderItems() {
        let output = [];
        let key = 0;
        this.state.newsItems.forEach(item => {
            let newItem = <NewsItem 
                        published={item.published}
                        source={item.source}
                        title={item.title}
                        image={item.image} />;
            output.push(<Grid key={key} item xs={12}>{newItem}</Grid>);
            key++;
        });
        return output;
    }

    render() {
        return (
            <Grid container spacing={1}>
                {this.renderItems()}
          </Grid>
        );
    }
}