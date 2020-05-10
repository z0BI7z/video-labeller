import React from 'react';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import VideoSlider from '../video-slider/video-slider.component';

import { updateTime } from '../../redux/videos/videos.actions';
import { selectFrameTime, selectIsFinished } from '../../redux/videos/videos.selectors';

import './video-controller.styles.scss';

class VideoController extends React.Component {
  constructor(props) {
    super(props);

    this.videoElement = this.props.videoElement;
    this.canMove = true;

    this.state = {
      playing: false,
    }
  }

  componentDidMount() {
    this.videoElement.addEventListener("timeupdate", this.handleTimeUpdate, false);
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  componentWillUnmount() {
    this.videoElement.removeEventListener("timeupdate", this.handleTimeUpdate, false);
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  componentDidUpdate() {
    if (this.props.isFinished && this.state.playing) {
      this.setState({
        ...this.state,
        playing: false
      });
    }
  }

  handleTimeUpdate = () => {
    const { updateTime } = this.props;
    updateTime(this.videoElement.currentTime);
  }

  handleKeyDown = (event) => {
    event.preventDefault();
    if (this.canMove) {

      const { frameTime } = this.props;
      this.canMove = false;
      setTimeout(() => this.canMove = true, 100);

      const { keyCode } = event;
      console.log(keyCode);

      switch (keyCode) {
        case 32:
          return this.togglePlaying();
        case 37:
          this.videoElement.currentTime = Math.max(this.videoElement.currentTime - frameTime, 0);
          return;
        case 39:
          this.videoElement.currentTime = Math.min(this.videoElement.currentTime + frameTime, this.videoElement.duration);
          return;
        default:
          return;
      }
    }
  }

  pauseVideo = () => {
    this.videoElement.pause();
    this.setState({
      ...this.state,
      playing: false
    });
  }

  playVideo = () => {
    this.videoElement.play();
    let delay = 0;
    if (this.props.isFinished) delay = 100;

    setTimeout(() => this.setState({
      ...this.state,
      playing: true
    }), delay);
  }

  togglePlaying = () => {
    if (this.state.playing) {
      this.pauseVideo()
    } else {
      this.playVideo();
    }
  }

  handleSliderChange = () => {
    if (this.state.playing) {
      this.videoElement.play();
    } else {
      this.videoElement.pause();
    }
  }

  render() {
    return (
      <div>
        <div className="video-controller__controls">
          <Button onClick={this.togglePlaying} className="video-controller__play-button" variant="contained">
            {
              this.state.playing ? <PauseIcon /> : <PlayArrowIcon />
            }
          </Button>
        </div>
        <VideoSlider videoElement={this.videoElement} callback={this.handleSliderChange} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  frameTime: selectFrameTime,
  isFinished: selectIsFinished
});

const mapDispatchToProps = dispatch => ({
  updateTime: time => dispatch(updateTime(time))
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoController);