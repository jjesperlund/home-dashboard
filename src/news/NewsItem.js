import React from 'react'
import moment from 'moment'
import Grid from '@material-ui/core/Grid';

const style = {
    text: {textAlign: 'left', padding: '10px', margin: 0},
    image: {maxWidth: '200px'},
    source: {fontSize: '10pt', margin: 0},
    heading: {fontSize: '15pt', marginTop: '5%'}
};

export default function NewsItem(props) {
return (
    <div style={{border: '1px solid white'}}>
            <Grid container spacing={1}>
            <Grid item xs={8} style={style.text}>
                <p style={style.source}>{props.source} - {moment(props.published).format('DD MMM HH:ss')}</p>
                <p style={style.heading}>{props.title}</p>
            </Grid>
            <Grid item xs={4}>
                <img src={props.image} alt="image" style={style.image} />
            </Grid>
        </Grid>
    </div>
);
}