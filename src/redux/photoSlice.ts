import { createSlice, CreateSliceOptions } from '@reduxjs/toolkit';
import { CuratedPhotoOption } from '../customHooks/useGetCuratedPhoto/useGetCuratedPhoto';
import { PhotoDetailOption } from '../customHooks/useGetPhotoDetail/useGetPhotoDetail';
interface PhotoSlice extends CreateSliceOptions {
  name : string
  initialState : PhotosBlockOption | PhotosDetailBlockOption | PhotosSearchBlockOption
  reducers : {}
}
interface PhotosBlockItem {
  photos : Array<any>
  loadingPhotos : null | boolean
  nextPage : null | string
}
interface PhotosBlockOption {
  photosBlocks : PhotosBlockItem
}

interface PhotosDetailBlockItem{
  photos : Array<any>,
  loadingPhotos : null | boolean
}
interface PhotosDetailBlockOption{
  photosDetailsBlock : PhotosDetailBlockItem
}

interface PhotosSearchBlockItem{
  photos : Array<any>,
  loadingPhotos : null | boolean,
  nextPage : null | string,
  query : string,
  totalResults : null | number
}
interface PhotosSearchBlockOption{
  photoSearchBlock : PhotosSearchBlockItem
}

export const photoSlice = createSlice(<PhotoSlice>{
  name: 'photo',
  initialState : {
    photosBlocks : {
      photos: [],
      loadingPhotos : null,
      nextPage : null
    },
    photosDetailsBlock : {
      photos : [],
      loadingPhotos : null
    },
    photoSearchBlock :{
      photos : [],
      loadingPhotos : null,
      nextPage : null,
      query : '',
      totalResults : null
    }
  },
  reducers : {
    addPhotos: (state:PhotosBlockOption,action:CuratedPhotoOption) => {
      state.photosBlocks.loadingPhotos = action.payload.loading
      state.photosBlocks.nextPage = action.payload.dataPhotos?.next_page
      if(action.payload.removeCopyArray){
        state.photosBlocks.photos.length = 0
        return
      }
      state.photosBlocks.photos = [...state.photosBlocks.photos,action.payload?.dataPhotos?.photos || []]
    },
    addPhotoDetails : (state:PhotosDetailBlockOption,action:PhotoDetailOption)=>{
      state.photosDetailsBlock.loadingPhotos = action.payload.loading
      state.photosDetailsBlock.photos = action.payload.dataPhotoDetails || []
    },
  },
  
  // reducers: {
  //   addPhotos: (state,action) => {
  //     state.photosBlock.loadingPhotos = action.payload.loading
  //     state.photosBlock.nextPage = action.payload.dataPhotos?.next_page
  //     if(action.payload.removeCopyArray){
  //       state.photosBlock.photos.length = 0
  //       return
  //     }
  //     state.photosBlock.photos = [...state.photosBlock.photos,action.payload?.dataPhotos?.photos || []]
  //   },
  //   addPhotoDetails : (state,action)=>{
  //     state.photosDetailsBlock.loadingPhotos = action.payload.loading
  //     state.photosDetailsBlock.photos = action.payload.dataPhotoDetails || []
  //   },
  //   addResultSearch : (state,action)=>{
  //     state.photoSearchBlock.loadingPhotos = action.payload.loading
  //     state.photoSearchBlock.query = action.payload.query
  //     state.photoSearchBlock.nextPage  = action.payload.dataPhotosResult?.next_page
  //     state.photoSearchBlock.totalResults = action.payload.totalResults
  //     if(action.payload.removeCopyArray){
  //       state.photoSearchBlock.photos.length = 0
  //     }
  //     state.photoSearchBlock.photos = [...state.photoSearchBlock.photos,action.payload?.dataPhotosResult?.photos || []]
  //   }
  // },
});

// export const { addPhotos,addPhotoDetails,addResultSearch } = photoSlice.actions
// export const selectPhotos = state => state.photos.photosBlock
// export const selectPhotoDetailsBlock = state => state.photos.photosDetailsBlock
// export const selectPhotoSearchBlock = state => state.photos.photoSearchBlock
export default photoSlice.reducer;
