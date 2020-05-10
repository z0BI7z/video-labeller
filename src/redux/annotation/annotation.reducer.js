import { LABELS } from './annotation.data';
import AnnotationActionTypes from './annotation.types';
import { addAnnotation, deleteAnnotation } from './annotation.utils';
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage';

const INITIAL_STATE = {
  labels: LABELS,
  data: [],
  lastLabelled: null,
}

// const persistConfig = {
//   key: 'annotations',
//   storage,
//   blacklist: ['labels']
// }

const annotationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AnnotationActionTypes.ADD_ANNOTATION:
      const { data, lastLabelled } = addAnnotation(state.data, action.payload);
      return {
        ...state,
        data,
        lastLabelled
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

// export default persistReducer(persistConfig, annotationReducer);
export default annotationReducer;