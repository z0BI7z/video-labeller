import React from 'react';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import VideoSlider from '../video-slider/video-slider.component';
import { updateTime } from '../../redux/videos/videos.actions';
import { selectFrameTime, selectCurrentVideoElement } from '../../redux/videos/videos.selectors';

import './video-controller.styles.scss';

class VideoController extends React.Component {
  constructor(props) {
    super(props);

    this.canMove = true;

    this.state = {
      playing: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videoElement !== this.props.videoElement) {
      if (prevProps.videoElement) {
        this.removeListeners(prevProps.videoElement);
      }
      if (this.props.videoElement) {
        this.addListeners(this.props.videoElement);
      }
    }
  }

  componentWillUnmount() {
    if (this.props.videoElement) {
      this.removeListeners(this.props.videoElement);
    }
  }

  addListeners = element => {
    element.addEventListener("timeupdate", this.handleTimeUpdate, false);
    element.addEventListener("ended", this.onVideoEnd, false);
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  removeListeners = element => {
    element.removeEventListener("timeupdate", this.handleTimeUpdate, false);
    element.removeEventListener("ended", this.onVideoEnd, false);
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  onVideoEnd = () => {
    this.setState({
      ...this.state,
      playing: false
    });
  }

  handleTimeUpdate = () => {
    const { updateTime } = this.props;
    updateTime(this.props.videoElement.currentTime);
  }

  changeTime = shift => {
    if (shift < 0) {
      this.props.videoElement.currentTime = Math.max(this.props.videoElement.currentTime + shift, 0);
    } else {
      this.props.videoElement.currentTime = Math.min(this.props.videoElement.currentTime + shift, this.props.videoElement.duration);
    }
  }

  handleKeyDown = (event) => {
    event.preventDefault();
    document.activeElement.blur();
    if (this.canMove) {

      const { frameTime } = this.props;
      this.canMove = false;
      setTimeout(() => this.canMove = true, 100);

      const { keyCode } = event;
      console.log('keycode: ', keyCode);

      switch (keyCode) {
        case 32:
        case 38:
        case 40:
          return this.togglePlaying();
        case 37:
          this.props.videoElement.currentTime = Math.max(this.props.videoElement.currentTime - frameTime, 0);
          return;
        case 39:
          this.props.videoElement.currentTime = Math.min(this.props.videoElement.currentTime + frameTime, this.props.videoElement.duration);
          return;
        default:
          return;
      }
    }
  }

  pauseVideo = () => {
    this.props.videoElement.pause();
    this.setState({
      ...this.state,
      playing: false
    });
  }

  playVideo = () => {
    this.props.videoElement.play();
    this.setState({
      ...this.state,
      playing: true,
    });
  }

  togglePlaying = () => {
    if (this.props.videoElement.playing) {
      this.pauseVideo();
    } else {
      this.playVideo();
    }
  }

  handleSliderChange = () => {
    if (this.state.playing) {
      this.props.videoElement.play();
    } else {
      this.props.videoElement.pause();
    }
  }

  logCurrentState = () => {
    console.log('paused? ', this.props.videoElement.paused)
    console.log('time: ', this.props.videoElement.currentTime)
    console.log('has ended?: ', this.props.videoElement.ended)
    console.log('playing?: ', this.props.videoElement.playing)
    console.log('duration', this.props.videoElement.duration)
  }

  render() {
    return (
      <div>
        {
          this.props.videoElement ?
            <div>
              <div className="video-controller__controls">
                <Button onClick={this.logCurrentState} variant="contained" className=" video-controller__btn" >Video Details</Button>
                <Button onClick={() => this.changeTime(-this.props.frameTime * 10)} variant="contained" className=" video-controller__btn" >Back</Button>
                <Button onClick={this.togglePlaying} className="video-controller__play-button video-controller__btn" variant="contained">
                  {
                    this.state.playing ? <PauseIcon /> : <PlayArrowIcon />
                  }
                </Button>
                <Button onClick={() => this.changeTime(this.props.frameTime * 10)} variant="contained" className=" video-controller__btn" >Forward</Button>
              </div>
              <VideoSlider videoElement={this.props.videoElement} callback={this.handleSliderChange} />
            </div>
            : <h1>test</h1>
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  frameTime: selectFrameTime,
  videoElement: selectCurrentVideoElement
});

const mapDispatchToProps = dispatch => ({
  updateTime: time => dispatch(updateTime(time))
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoController);