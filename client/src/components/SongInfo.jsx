import React from 'react';

const SongInfo = (props) => {
  if (props.song) {
    var songArtist = props.song.artist_name;
    var songName = props.song.song_name;
  } else {
    var songArtist = null;
    var songName = null;
  }
  return (
    <div>
      <div>{songArtist}</div>
      <div>{songName}</div>
    </div>
  );
};

export default SongInfo;
