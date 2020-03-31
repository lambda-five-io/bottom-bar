import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './ControlPlay.css';

class ControlPlay extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setIsPlaying(!this.props.isPlaying);
  }

  render() {
    if (this.props.isPlaying === true) {
      return (
        <div>
          <button type="button" id="playbtn" onClick={this.handleClick}>PAUSE</button>
        </div>
      );
    } else {
      return (
        <div>
          <button type="button" id="playbtn" onClick={this.handleClick}>PLAY</button>
        </div>
      );
    }
  }
}
export default CSSModules(ControlPlay, styles);

// when the play button is clicked, play current song

// does this class need a state? -- YES, play/pause
// where does the current song come from? App?
// need to render play button... where does play button come from? s3?
// need to render pause button
// first, render play button
// when play button is clicked, change button image to pause
// get current song's audio file from s3 and play
// when pause button is clicked, change button image to play
// stop playing current song
