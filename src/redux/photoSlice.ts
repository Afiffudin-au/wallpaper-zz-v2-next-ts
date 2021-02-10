import { createSlice, CreateSliceOptions } from '@reduxjs/toolkit';
interface PhotoSlice extends CreateSliceOptions {
  name : string
  initialState : PhotosBlockOption | PhotosDetailBlockOption | PhotosSearchBlockOption
  reducers : any
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

//Action inteface
interface CuratedPhotoItems{
  loading : boolean
  next_page : number
  dataPhotos : any
  removeCopyArray : boolean
}
interface CuratedPhotoAction{
  payload: CuratedPhotoItems;
}

interface PhotoDetailItems{
  loading : boolean
  dataPhotoDetails : Array<any>
}
export interface PhotoDetailAction{
  payload : PhotoDetailItems,
}
interface PhotoSearchItems{
  loading : boolean
  query : string
  dataPhotosResult : any
  totalResults : number
  removeCopyArray : boolean
}
interface PhotoSearchAction{
  payload : PhotoSearchItems
}

interface StateItems{
  photosBlock : {}
  photosDetailsBlock : {}
  photoSearchBlock : {}
}
interface StateInterface {
  photos :StateItems
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
    addPhotos: (state:PhotosBlockOption,action:CuratedPhotoAction) => {
      state.photosBlocks.loadingPhotos = action.payload.loading
      state.photosBlocks.nextPage = action.payload.dataPhotos?.next_page
      if(action.payload.removeCopyArray){
        state.photosBlocks.photos.length = 0
        return
      }
      state.photosBlocks.photos = [...state.photosBlocks.photos,action.payload?.dataPhotos?.photos || []]
    },
    addPhotoDetails : (state:PhotosDetailBlockOption,action:PhotoDetailAction)=>{
      state.photosDetailsBlock.loadingPhotos = action.payload.loading
      state.photosDetailsBlock.photos = action.payload.dataPhotoDetails || []
    },
    addResultSearch : (state:PhotosSearchBlockOption,action:PhotoSearchAction)=>{
      state.photoSearchBlock.loadingPhotos = action.payload.loading
      state.photoSearchBlock.query = action.payload.query
      state.photoSearchBlock.nextPage  = action.payload.dataPhotosResult?.next_page
      state.photoSearchBlock.totalResults = action.payload.totalResults
      if(action.payload.removeCopyArray){
        state.photoSearchBlock.photos.length = 0
      }
      state.photoSearchBlock.photos = [...state.photoSearchBlock.photos,action.payload?.dataPhotosResult?.photos || []]
    }
  },
});

export const { addPhotos,addPhotoDetails,addResultSearch } = photoSlice.actions
export const selectPhotos = (state:StateInterface) => state.photos.photosBlock
export const selectPhotoDetailsBlock = (state:StateInterface) => state.photos.photosDetailsBlock
export const selectPhotoSearchBlock = (state:StateInterface) => state.photos.photoSearchBlock
export default photoSlice.reducer;
