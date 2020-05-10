import VideosActionTypes from './videos.types';

export const setCurrentVideo = details => ({
  type: VideosActionTypes.SET_CURRENT_VIDEO,
  payload: details
});

export const updateTime = time => ({
  type: VideosActionTypes.UPDATE_TIME,
  payload: time
});
