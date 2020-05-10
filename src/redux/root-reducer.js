import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import videosReducer from './videos/videos.reducer';
import annotationReducer from './annotation/annotation.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['annotation'],
  stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
  videos: videosReducer,
  annotation: annotationReducer
});

export default persistReducer(persistConfig, rootReducer);