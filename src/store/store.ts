import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import photosReducer from '../redux/photoSlice'
import videosReducer from '../redux/videoSlice'
const store = configureStore({
  reducer: {
    photos: photosReducer,
    videos: videosReducer,
  },
})
export default store
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
