import { createSlice, CreateSliceOptions } from '@reduxjs/toolkit';
interface PhotoSlice extends CreateSliceOptions {
  name: string
  initialState: PhotosBlockOption | PhotosDetailBlockOption | PhotosSearchBlockOption
}
//photosBlocks
export interface PhotosBlockItem {
  photos: Array<any>
  loadingPhotos: boolean | null
  nextPage: number
}
interface PhotosBlockOption {
  photosBlocks: PhotosBlockItem
}

//photosDetailsBlocks
interface PhotosDetailBlockItem {
  photos: Array<any>,
  loadingPhotos: null | boolean
}
interface PhotosDetailBlockOption {
  photosDetailsBlocks: PhotosDetailBlockItem
}

//photoSearchBlocks
interface PhotosSearchBlockItem {
  photos: Array<any>,
  loadingPhotos: boolean  | null,
  nextPage: number,
  query: string,
  totalResults: null | number
}
interface PhotosSearchBlockOption {
  photoSearchBlocks: PhotosSearchBlockItem
}

//Action inteface
export interface CuratedPhotoItems {
  loading: boolean
  next_page: number
  photos: any
  removeCopyArray: boolean
}
interface CuratedPhotoAction {
  payload: CuratedPhotoItems;
}

export interface PhotoDetailItems {
  loading: boolean
  dataPhotoDetails: any
}
interface PhotoDetailAction {
  payload: PhotoDetailItems,
}
export interface PhotoSearchItems {
  loading: boolean
  query: string
  dataPhotosResult: any
  totalResults: number
  removeCopyArray: boolean
}
interface PhotoSearchAction {
  payload: PhotoSearchItems
}

interface StateItems {
  photosBlocks: {}
  photosDetailsBlocks: {}
  photoSearchBlocks: {}
}
interface StateInterface {
  photos: StateItems
}
export const photoSlice = createSlice(<PhotoSlice>{
  name: 'photo',
  initialState: {
    photosBlocks: {
      photos: [],
      loadingPhotos: null,
      nextPage: null
    },
    photosDetailsBlocks: {
      photos: [],
      loadingPhotos: null
    },
    photoSearchBlocks: {
      photos: [],
      loadingPhotos: null,
      nextPage: null,
      query: '',
      totalResults: null
    }
  },
  reducers: {
    addPhotos: (state: PhotosBlockOption, action: CuratedPhotoAction) => {
      state.photosBlocks.loadingPhotos = action.payload.loading
      state.photosBlocks.nextPage = action.payload.photos?.next_page
      if (action.payload.removeCopyArray) {
        state.photosBlocks.photos.length = 0
        return
      }
      if(action.payload?.photos?.photos === undefined){
        return
      }
      state.photosBlocks.photos = [...state.photosBlocks.photos, action.payload?.photos?.photos || []]
    },
    addPhotoDetails: (state: PhotosDetailBlockOption, action: PhotoDetailAction) => {
      state.photosDetailsBlocks.loadingPhotos = action.payload.loading
      state.photosDetailsBlocks.photos = action.payload.dataPhotoDetails || []
    },
    addResultSearch: (state: PhotosSearchBlockOption, action: PhotoSearchAction) => {
      state.photoSearchBlocks.loadingPhotos = action.payload.loading
      state.photoSearchBlocks.query = action.payload.query
      state.photoSearchBlocks.nextPage = action.payload.dataPhotosResult?.next_page
      state.photoSearchBlocks.totalResults = action.payload.totalResults
      if (action.payload.removeCopyArray) {
        state.photoSearchBlocks.photos.length = 0
      }
      state.photoSearchBlocks.photos = [...state.photoSearchBlocks.photos, action.payload?.dataPhotosResult?.photos || []]
    }
  },
});

export const { addPhotos, addPhotoDetails, addResultSearch } = photoSlice.actions
export const selectPhotosBlocks = (state: StateInterface) => state.photos.photosBlocks
export const selectPhotoDetailsBlock = (state: StateInterface) => state.photos.photosDetailsBlocks
export const selectPhotoSearchBlock = (state: StateInterface) => state.photos.photoSearchBlocks
export default photoSlice.reducer;
