import React from 'react'
import moment from 'moment'
import Grid from '@material-ui/core/Grid';

const style = {
    text: {textAlign: 'left', padding: '10px', margin: 0},
    image: {maxHeight: '100px', display: 'block', paddingTop: '2%', borderRadius: '7px'},
    source: {fontSize: '10pt', margin: 0},
    heading: {fontSize: '15pt', marginTop: '2%', fontWeight: 600},
    boxStyle: {
        backgroundColor: 'rgba(48, 48, 48, 0.3)',
        borderRadius: '7px',
        zIndex: 1,
        textAlign: 'center',
        margin: '1% 0%'
    }
};

export default function NewsItem(props) {
return (
    <div style={style.boxStyle}>
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