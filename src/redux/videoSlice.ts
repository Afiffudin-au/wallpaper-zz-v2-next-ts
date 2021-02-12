import { createSlice, CreateSliceOptions } from '@reduxjs/toolkit';
interface VideoSlice extends CreateSliceOptions{
  name : string
  initialState : VideosBlockOption | VideosDetailsOption |VideoSearchBlockOption
}
//Interface for Videos Block
export interface VideosBlockItems{
  videos : Array<any>
  loadingVideo : boolean | null
  totalResult : number | null
}
interface VideosBlockOption{
  videosBlock : VideosBlockItems
}

//Interface For Videos Detail
interface VideosDetailsOption{
  videosDetails : Array<any>
}

//Interface For Video Search Block
interface VideoSearchBlockItems{
  videos : Array<any>,
  loadingVideo : boolean | null
  totalResult : number | null
  query : string
}
interface VideoSearchBlockOption{
  videoSearchBlock : VideoSearchBlockItems
}

//Interface for Action
//addVideos 
export interface VideoActionItems{
  loading : boolean
  dataVideo : any
  removeCopyArray : boolean
}
interface VideoAction{
  payload : VideoActionItems
}
//AddVideoSearch
export interface VideoSearchItems{
  loading : boolean
  dataVideo : any
  query : string
  removeCopyArray : boolean
}
interface VideoSearchAction{
  payload : VideoSearchItems
}

//Interface State 
interface StateInterfaceItem{
  videoSearchBlock : {} 
  videosDetails : {} 
  videosBlock : {}
}
interface StateInterface{
  videos : StateInterfaceItem
}
export const videoSlice = createSlice(<VideoSlice>{
  name: 'video',
  initialState: {
    videosBlock : {
      videos: [],
      loadingVideo : null,
      totalResult : null
    },
    videosDetails : [],
    videoSearchBlock : {
      videos : [],
      loadingVideo : null,
      totalResult : null,
      query : ''
    }
  },
  reducers: {
    addVideos: (state:VideosBlockOption,action:VideoAction) => {
      state.videosBlock.loadingVideo = action.payload.loading
      state.videosBlock.totalResult  = action.payload.dataVideo?.total_results
      if(action.payload.removeCopyArray){
        state.videosBlock.videos.length = 0
        return
      }
      if(action.payload?.dataVideo?.videos === undefined){
        return
      }
      state.videosBlock.videos = [...state.videosBlock.videos,action.payload?.dataVideo?.videos || []]
    },
    addVideoSearch : (state:VideoSearchBlockOption,action:VideoSearchAction)=>{
      state.videoSearchBlock.loadingVideo = action.payload.loading
      state.videoSearchBlock.totalResult = action.payload.dataVideo?.total_results
      state.videoSearchBlock.query = action.payload.query
      if(action.payload.removeCopyArray){
        state.videoSearchBlock.videos.length = 0
        return
      } 
      state.videoSearchBlock.videos = [...state.videoSearchBlock.videos,action.payload?.dataVideo?.videos || []]
    }
  },
});

export const { addVideos,addVideoSearch } = videoSlice.actions
export const selectVideos = (state:StateInterface) => state.videos.videosBlock
export const selectVideoDetail = (state:StateInterface) => state.videos.videosDetails
export const selectVideoSearchBlock = (state:StateInterface) => state.videos.videoSearchBlock
export default videoSlice.reducer;
