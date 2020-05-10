import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import VideoDisplay from '../../components/video-display/video-display.component';
import AnnotationTools from '../../components/annotation-tools/annotation-tools.components';

import { selectVideosList } from '../../redux/videos/videos.selectors';
import { setCurrentVideo } from '../../redux/videos/videos.actions';

import './labelling.styles.scss';

const LabellingPage = ({ videosList, setCurrentVideo }) => {
  const [videoIndex, setVideoIndex] = useState(0);

  const handleClick = () => {
    videoIndex === 0 ? setVideoIndex(1) : setVideoIndex(0);
    setCurrentVideo({
      ...currentVideo,
      time: 0
    });
  }

  const currentVideo = videosList[videoIndex];
  const video = require(`../../data/videos/${currentVideo.name}`)

  return (
    <div className="labelling-page">
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={7} >
          <VideoDisplay video={video} />
          <button onClick={handleClick}>Click Me</button>
        </Grid>
        <Grid item xs={12} md={5}>
          <AnnotationTools />
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  videosList: selectVideosList
});

const mapDispatchToProps = dispatch => ({
  setCurrentVideo: details => dispatch(setCurrentVideo(details))
})

export default connect(mapStateToProps, mapDispatchToProps)(LabellingPage);