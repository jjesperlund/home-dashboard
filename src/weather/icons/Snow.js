import React from 'react'

const style = {
    white: {fill: '#FFFFFF'},
};
/**
 *  Animated snow clouds
 * */
export default function Snow(props) {
    return (
        <div className="element">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 55.1 52.5" style={{enableBackground: '0 0 55.1 52.5'}} xmlSpace="preserve" height={props.size} width={props.size}>
          <g id="Cloud_7">
              <g id="White_cloud_7">
                  <path id="XMLID_8_" style={style.white} d="M47.2,34.5H7.9c-4.3,0-7.9-3.5-7.9-7.9l0,0c0-4.3,3.5-7.9,7.9-7.9h39.4c4.3,0,7.9,3.5,7.9,7.9 v0C55.1,30.9,51.6,34.5,47.2,34.5z"/>
                  <circle id="XMLID_5_" style={style.white} cx="17.4" cy="17.3" r="9.3"/>
                  <circle id="XMLID_1_" style={style.white} cx="34.5" cy="15.6" r="15.6"/>
              </g>
            <circle style={style.white} cx="37" cy="43.5" r="3">
              <animateTransform attributeName="transform"
                attributeType="XML"
                dur="1.5s"
                keyTimes="0;0.33;0.66;1"
                repeatCount="indefinite"
                type="translate"
                values="1 -2;3 2; 1 4; 2 6"
                calcMode="linear">
              </animateTransform>
            </circle>
            <circle style={style.white} cx="27" cy="43.5" r="3">
              <animateTransform attributeName="transform"
                attributeType="XML"
                dur="1.5s"
                keyTimes="0;0.33;0.66;1"
                repeatCount="indefinite"
                type="translate"
                values="1 -2;3 2; 1 4; 2 6"
                calcMode="linear">
              </animateTransform>
            </circle>
            <circle style={style.white} cx="17" cy="43.5" r="3">
              <animateTransform attributeName="transform"
                attributeType="XML"
                dur="1.5s"
                keyTimes="0;0.33;0.66;1"
                repeatCount="indefinite"
                type="translate"
                values="1 -2;3 2; 1 4; 2 6"
                calcMode="linear">
              </animateTransform>
            </circle>
          </g>
        </svg>
      </div>
    );
}