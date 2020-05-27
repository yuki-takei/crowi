import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';

export default class HotkeysDetector extends React.Component {

  constructor(props) {
    super(props);
    this.onDetected = this.props.onDetected;
  }


  render() {
    return (
      <GlobalHotKeys>
        <button type="button" onClick={this.onDetected}>
          Click!
        </button>
        <button type="button" onClick={this.onDetected}>
          Click!
        </button>
      </GlobalHotKeys>
    );
  }

}
