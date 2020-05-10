import AnnotationActionTypes from './annotation.types';

export const addAnnotation = (label, currentVideo) => ({
  type: AnnotationActionTypes.ADD_ANNOTATION,
  payload: {
    label,
    currentVideo
  }
});

export const clearAnnotations = () => ({
  type: AnnotationActionTypes.CLEAR_ANNOTATIONS,
});

export const deleteAnnotation = (item) => ({
  type: AnnotationActionTypes.DELETE_ANNOTATION,
  payload: item
});