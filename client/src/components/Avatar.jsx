import React from 'react';

const Avatar = (props) => {
  if (props.song) {
    var imgUrl = props.song.song_image;
  } else {
    var imgUrl = null;
  }
  return (
    <div>
      <img src={imgUrl}></img>
      {/* <img src="https://i.picsum.photos/id/1072/50/50.jpg"></img> */}
    </div>
  )};

export default Avatar;
