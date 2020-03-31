import React from 'react';

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
        <button type="button" id="nextbtn" onClick={this.handleClick} disabled={this.props.disabled}>NEXT</button>
      </div>
    );
  }
}

export default ControlNext;
