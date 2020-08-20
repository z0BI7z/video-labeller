import React, { useState } from 'react';
import './labelling.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectVideosList } from '../../redux/videos/videos.selectors';
import { setCurrentVideo } from '../../redux/videos/videos.actions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import VideoDisplay from '../../components/video-display/video-display.component';
import VideoController from '../../components/video-controller/video-controller.component';
import AnnotationTools from '../../components/annotation-tools/annotation-tools.components';

const LabellingPage = ({ videosList, setCurrentVideo }) => {
  const [videoIndex, setVideoIndex] = useState(0);

  const handleClick = () => {
    videoIndex === 0 ? setVideoIndex(Math.min(videosList.length, 1)) : setVideoIndex(0);
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
          <div className="labelling-page__video-controller">
            <VideoController />
          </div>
          <Button onClick={handleClick} variant="contained">Swap Video</Button>
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