import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './CSS/ControlPrevious.css';

class ControlPrevious extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setPrevSong();
  }

  render() {
    return (
      <div>
        <button className="fuller-button blue" type="button" id="prevbtn" onClick={this.handleClick} disabled={this.props.disabled}>PREV</button>
      </div>
    );
  }
}

export default CSSModules(ControlPrevious, styles);
