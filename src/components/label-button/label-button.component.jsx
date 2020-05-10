import React from 'react';
import Button from '@material-ui/core/Button';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { addAnnotation } from '../../redux/annotation/annotation.actions';
import { selectCurrentVideo } from '../../redux/videos/videos.selectors';

const LabelButton = ({ label, currentVideo, addAnnotation }) => {
  const handleClick = () => {
    addAnnotation(label, currentVideo);
  }

  return (
    <div>
      <Button onClick={handleClick} variant="contained" color="default">{label}</Button>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentVideo: selectCurrentVideo
})

const mapDispatchToProps = dispatch => ({
  addAnnotation: (label, currentVideo) => dispatch(addAnnotation(label, currentVideo))
});

export default connect(mapStateToProps, mapDispatchToProps)(LabelButton);