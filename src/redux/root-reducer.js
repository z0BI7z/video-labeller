import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import videosReducer from './videos/videos.reducer';
import annotationReducer from './annotation/annotation.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['annotation']
};

const rootReducer = combineReducers({
  videos: videosReducer,
  annotation: annotationReducer
});

export default persistReducer(persistConfig, rootReducer);