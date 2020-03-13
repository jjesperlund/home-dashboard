import React from 'react'

const style = {
    yellow: {fill: '#FFEB3B'}, // yellow
    container: {width: 'fit-content'}
};
/**
 *  Animated moon
 * */
export default function Moon(props) {
    return (
    <div className="element" style={style.container}>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30.8 42.5" style={{enableBackground: '0 0 30.8 42.5'}} xmlSpace="preserve" height={props.size} width={props.size}>
        <path id="Moon" style={style.yellow} d="M15.3,21.4C15,12.1,21.1,4.2,29.7,1.7c-2.8-1.2-5.8-1.8-9.1-1.7C8.9,0.4-0.3,10.1,0,21.9 c0.3,11.7,10.1,20.9,21.9,20.6c3.2-0.1,6.3-0.9,8.9-2.3C22.2,38.3,15.6,30.7,15.3,21.4z"/>
        </svg>
    </div>
    );
}