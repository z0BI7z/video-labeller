import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { selectCurrentVideo } from '../../redux/videos/videos.selectors.js';

import './video-slider.styles.scss';

const VideoSlider = ({ videoElement, currentVideo, callback }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(currentVideo.time / currentVideo.duration * 100);
  }, [currentVideo]);

  const handleChange = (event, newValue) => {
    videoElement.pause();
    setValue(newValue);
  }

  const handleChangeCommitted = () => {
    document.activeElement.blur();

    videoElement.currentTime = value / 100 * currentVideo.duration;
    callback()
  }

  return (
    <div className="video-slider">
      <div>
        <p className="frame-counter">frame: {Math.round(value / 100 * currentVideo.totalFrames)}</p>
      </div>
      <Slider value={value} onChange={handleChange} onChangeCommitted={handleChangeCommitted} className="video-slider__slider" />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentVideo: selectCurrentVideo
});

export default connect(mapStateToProps)(VideoSlider);