import React from 'react';
import { connect } from 'react-redux';
import { setCurrentVideoElement } from '../../redux/videos/videos.actions';

import './video-display.styles.scss';

class VideoDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.videoElement = React.createRef();
  }

  componentDidMount() {
    this.props.setCurrentVideoElement(this.videoElement.current);
  }

  render() {
    return (
      <div>
        <div className="video-display__video-container">
          <video src={this.props.video} ref={this.videoElement} id='video'></video>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentVideoElement: videoElement => dispatch(setCurrentVideoElement(videoElement))
});

export default connect(null, mapDispatchToProps)(VideoDisplay);