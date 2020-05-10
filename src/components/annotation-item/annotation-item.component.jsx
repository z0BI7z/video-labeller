import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';

import { deleteAnnotation } from '../../redux/annotation/annotation.actions';

const AnnotationItem = ({ annotation, deleteAnnotation }) => {
  const { label, frame } = annotation;

  const handleClick = () => deleteAnnotation(annotation);

  return (
    <ListItem className="annotations-list__item">
      <ListItemText primary={label} secondary={`frame: ${frame}`} />
      <IconButton onClick={handleClick} edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

const mapDispatchToProps = dispatch => ({
  deleteAnnotation: (item) => dispatch(deleteAnnotation(item))
});

export default connect(null, mapDispatchToProps)(AnnotationItem);