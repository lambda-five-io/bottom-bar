import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './CSS/Avatar.css';

const Avatar = (props) => {
  if (props.song) {
    let number = props.song.song_image;
    if (number < 10) {
      number = '00' + number;
    } else if (number < 100) {
      number = '0' + number;
    }
    var imgUrl = 'https://audibly-bottom-player-songjpegs.s3-us-west-1.amazonaws.com/' + number + '.jpg';
  } else {
    var imgUrl = 'https://cdn.freebiesupply.com/logos/thumbs/2x/react-1-logo.png';
  }
  return (
    <div>
      <img src={imgUrl}></img>
    </div>
  )};

export default Avatar;
