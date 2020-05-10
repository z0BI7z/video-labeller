import React from 'react';
import VideoController from '../../components/video-controller/video-controller.component';

import './video-display.styles.scss';

class VideoDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.videoElement = React.createRef();

    this.state = {
      videoElement: null
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      videoElement: this.videoElement.current
    });
  }

  render() {
    const { videoElement } = this.state;

    return (
      <div>
        <div className="video-display__video-container">
          <video src={this.props.video} ref={this.videoElement} id='video'></video>
        </div>
        <div className="video-display__video-controller-container">
          {
            videoElement &&
            <VideoController videoElement={videoElement} />
          }
        </div>
      </div>
    );
  }
}

export default VideoDisplay;