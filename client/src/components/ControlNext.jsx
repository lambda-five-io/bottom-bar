import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './CSS/ControlNext.css';

class ControlNext extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setNextSong();
  }

  render() {
    return (
      <div>
        <button className="fuller-button blue" type="button" id="nextbtn" onClick={this.handleClick} disabled={this.props.disabled}>NEXT</button>
      </div>
    );
  }
}

export default ControlNext;
