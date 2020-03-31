/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

// TODO:
// audio element needs an event listener to be able to work with seekbar....

class AudioManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: props.currentTime,
      isPlaying: props.isPlaying
    };
    this.myRef = React.createRef();
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
  }

  componentDidUpdate(prevProps) {
    // check if either properties were updated
    if (this.props.isPlaying !== prevProps.isPlaying) {
      if (this.props.isPlaying) {
        this.myRef.current.play();
      } else {
        this.myRef.current.pause();
      }
    }
    if (this.props.currentTime !== prevProps.currentTime) {
      this.myRef.current.currentTime = this.props.currentTime;
    }
  }

  onTimeUpdate() {
    this.setState({ currentTime: this.myRef.current.currentTime });
    this.props.onTimeUpdate(this.state.currentTime);
  }

  render() {
    if (this.props.song) {
      var audioUrl = this.props.song.song_audio;
    } else {
      var audioUrl = null;
    }

    return (
      <audio
        autoPlay={this.state.isPlaying}
        ref={this.myRef}
        src={audioUrl}
        onTimeUpdate={this.onTimeUpdate}>
        Your browser does not support the <code>audio</code> element.
      </audio>
    );
  }
  
}

export default AudioManager;
