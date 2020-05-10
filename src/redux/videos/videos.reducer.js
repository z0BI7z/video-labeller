import VideosActionTypes from './videos.types';
import VIDEOS_LIST from './videos.data';

const INITIAL_STATE = {
  videosList: VIDEOS_LIST,
  currentVideo: {
    ...VIDEOS_LIST[0],
    time: 0
  }
}

const videosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VideosActionTypes.SET_CURRENT_VIDEO:
      return {
        ...state,
        currentVideo: action.payload
      }
    case VideosActionTypes.UPDATE_TIME:
      return {
        ...state,
        currentVideo: {
          ...state.currentVideo,
          time: action.payload
        }
      }
    default:
      return state;
  }
}

export default videosReducer;