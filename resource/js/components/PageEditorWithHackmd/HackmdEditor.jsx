import React from 'react';
import PropTypes from 'prop-types';

export default class HackmdEditor extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
    };

    this.loadHandler = this.loadHandler.bind(this);
  }

  componentWillMount() {
  }

  syncToLatestRevision() {

  }

  loadHandler() {

  }

  render() {
    const src = `${this.props.hackMdUri}/${this.props.pageIdOnHackmd}`;
    return (
      <iframe id='iframe-hackmd'
        ref='iframe'
        src={src}
        onLoad={this.loadHandler}
      >
      </iframe>
    );
  }
}

HackmdEditor.propTypes = {
  markdown: PropTypes.string.isRequired,
  hackMdUri: PropTypes.string.isRequired,
  pageIdOnHackmd: PropTypes.string.isRequired,
};
