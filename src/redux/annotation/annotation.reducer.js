import { LABELS } from './annotation.data';
import AnnotationActionTypes from './annotation.types';
import { addAnnotation, deleteAnnotation } from './annotation.utils';

const INITIAL_STATE = {
  labels: LABELS,
  data: []
}

const annotationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AnnotationActionTypes.ADD_ANNOTATION:
      return {
        ...state,
        data: addAnnotation(state.data, action.payload)
      }
    case AnnotationActionTypes.CLEAR_ANNOTATIONS:
      return {
        ...state,
        data: []
      }
    case AnnotationActionTypes.DELETE_ANNOTATION:
      return {
        ...state,
        data: deleteAnnotation(state.data, action.payload)
      }
    default:
      return state;
  }
}

export default annotationReducer;