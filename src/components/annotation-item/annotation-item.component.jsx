import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';

import { deleteAnnotation } from '../../redux/annotation/annotation.actions';

const AnnotationItem = ({ annotation, isTarget, deleteAnnotation }) => {
  const [willDelete, setToDelete] = useState(false);
  const [rendered, toggleRender] = useState(false);

  useEffect(() => {
    toggleRender(true);
    setTimeout(() => toggleRender(false), 500);
  }, [annotation]);


  const { label, frame } = annotation;

  const handleClick = (event) => {
    if (!willDelete) {
      setToDelete(true);
      setTimeout(() => {
        deleteAnnotation(annotation);
      }, 300);
    }
  }

  return (
    <div id={isTarget ? "last-labelled" : null} className={`annotations-list__item-container ${willDelete ? 'pending-deletion' : null} ${rendered ? 'animate' : null}`}>
      <ListItem className={`annotations-list__item`}>
        <ListItemText primary={label} secondary={`frame: ${frame}`} />
        <IconButton onClick={handleClick} edge="end" aria-label="delete">
          <DeleteIcon className="delete-button" />
        </IconButton>
      </ListItem>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  deleteAnnotation: (item) => dispatch(deleteAnnotation(item))
});

export default connect(null, mapDispatchToProps)(AnnotationItem);