import React, { useEffect }  from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { IconButton } from '@material-ui/core'
import CardPhoto from '../CardPhoto/CardPhoto';
import styled from 'styled-components'
import { useGetCuratedPhoto } from '../../customHooks/useGetCuratedPhoto/useGetCuratedPhoto';
const PhotoContainer =  styled.div `
  .backTop{
    color: rgb(88, 104, 243);
    font-size: 25px;
    transition: color .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:hover{
      color: rgb(24, 117, 255);
    }
  }
  .button_increase{
    cursor: pointer;
    display: block;
    margin: auto;
    width: 100%;
    height: 30px;
    border: none;
    outline: 0;
    background: grey;
    color: white;
    font-size: 16px;
    font-weight: 500;
    border-radius: 5px;
    transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:hover{
      background-color: rgb(62, 112, 247);
      transform: scale(1.01);
    }
  }
`
const PhotoContainerGrid = styled.div`
  display: grid;
  grid-gap: 0.25rem;
  gap:0.25rem;

`
interface Portrait{
  portrait : string
}
export interface CardPhotoType {
  id? : string
  url? : string
  imgPortrait? : string
  src? : Portrait
}
export default function PhotosContainer({dataPhotos}:any){
  const {data,getCuratedPhoto} = useGetCuratedPhoto()
  const photos = data.photos || dataPhotos.photos
  useEffect(() => {
    // getCuratedPhoto()
  }, [])
  return (
    <PhotoContainer>
      <PhotoContainerGrid className="photoContainerGrid">
        {/* {
          photos?.map(photo=>(
            photo.map(photo=>(
              <div key={photo.id}>
                <MemoizedChildComponent
                id={photo.id}
                url={photo.url}
                imgPortrait={photo.src.portrait} />
              </div>
            ))
          ))
        } */}
        {
          photos?.map((dataPhoto:CardPhotoType,index:number)=>(
            <div key={dataPhoto.id}>
              <MemoizedChildComponent
              id={dataPhoto.id}
              url={dataPhoto.url}
              imgPortrait={dataPhoto.src?.portrait} />
            </div>
          ))
        }
      </PhotoContainerGrid>
      <div style={{position : 'sticky',top : 0,marginBottom : '5px'}}>
      {/* {
        loadingPhotos && <LinearProgress color="secondary"/>
      } */}
      </div>
      {/* {
        nextPage && <button className="button_increase" onClick={()=>setPageNumber(current => current + 1)}>Load More...</button>
      } */}
      {/* {
        !loadingPhotos && <IconButton>
          <a href="#navTop">
            <ArrowUpwardIcon className="backTop"/>
          </a>
        </IconButton>
      } */}
    </PhotoContainer>
  )
}
function ChildComponent({id,url,imgPortrait}:CardPhotoType){
  return(
    <CardPhoto
      id={id}
      url={url}
      imgPortrait={imgPortrait}
    />
  )
}
const MemoizedChildComponent = React.memo(ChildComponent)