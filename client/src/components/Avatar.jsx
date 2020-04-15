import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './CSS/Avatar.css';

const Avatar = (props) => {
  if (props.song) {
    var imgUrl = props.song.song_image;
  } else {
    var imgUrl = 'https://cdn.freebiesupply.com/logos/thumbs/2x/react-1-logo.png';
  }
  return (
    <div>
      <img src={imgUrl}></img>
    </div>
  )};

export default Avatar;
