import { configureStore } from '@reduxjs/toolkit';
import photosReducer from '../redux/photoSlice';
import videosReducer from '../redux/videoSlice'
export default configureStore({
  reducer: {
    photos: photosReducer,
    videos : videosReducer
  },
});
