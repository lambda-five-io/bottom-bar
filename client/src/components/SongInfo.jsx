import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './CSS/SongInfo.css';

const SongInfo = (props) => {
  if (props.song) {
    var songArtist = props.song.artist;
    var songName = props.song.song_name;
    var album = props.song.album;
    var genre = props.song.genre;
    var date = props.song.upload_date;
  } else {
    var songArtist = null;
    var songName = null;
  }
  return (
    <div>
      <div className="songAwesome">Artist: &nbsp; {songArtist}</div>
      <div className="songAwesome">Title: &nbsp; &nbsp; {songName}</div>
      <div className="songAwesome">Album: &nbsp; {album}</div>
      <div className="bonus">{genre}</div>
      <div className="bonus">{date}</div>
    </div>
  );
};

export default SongInfo;
