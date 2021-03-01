import React, { useEffect, useState } from 'react'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { IconButton } from '@material-ui/core'
import CardPhoto, { CardPhotoOptions } from '../CardPhoto/CardPhoto'
import styled from 'styled-components'
import { useGetCuratedPhoto } from '../../customHooks/useGetCuratedPhoto/useGetCuratedPhoto'
import { useSelector } from 'react-redux'
import {
  addPhotos,
  PhotosBlockItem,
  selectPhotosBlocks,
} from '../../redux/photoSlice'
import styles from './PhotosContainer.module.scss'
import { useAppDispatch } from '../../store/store'
import { StyledLinearProgress } from '../LoadingProgress/LoadingProgress'
const PhotoContainer = styled.div`
  .backTop {
    color: rgb(88, 104, 243);
    font-size: 25px;
    transition: color 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:hover {
      color: rgb(24, 117, 255);
    }
  }
  .button_increase {
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
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:hover {
      background-color: rgb(62, 112, 247);
      transform: scale(1.01);
    }
  }
`
const PhotoContainerGrid = styled.div`
  display: grid;
  grid-gap: 0.25rem;
  gap: 0.25rem;
`
interface Portrait {
  portrait: string
}
export interface PhotoOptions {
  id?: string
  url?: string
  imgPortrait?: string
  src?: Portrait
}
export default function PhotosContainer({ dataPhotos }: any) {
  const dispatch = useAppDispatch()
  const [ssrData] = useState<any>(dataPhotos)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { getCuratedPhoto } = useGetCuratedPhoto()
  const {
    photos,
    loadingPhotos,
    nextPage,
  }: Partial<PhotosBlockItem> = useSelector(selectPhotosBlocks)
  useEffect(() => {
    dispatch(
      addPhotos({
        removeCopyArray: true,
      })
    )
  }, [])
  useEffect(() => {
    getCuratedPhoto(pageNumber)
  }, [pageNumber])
  return (
    <PhotoContainer>
      <PhotoContainerGrid className={styles.photoContainerGrid}>
        {pageNumber > 1
          ? photos?.map((photo: any) =>
              photo.map((photo: PhotoOptions) => (
                <div key={photo.id}>
                  <MemoizedChildComponent
                    id={photo.id}
                    url={photo.url}
                    imgPortrait={photo?.src?.portrait}
                  />
                </div>
              ))
            )
          : ssrData.photos.map((photo: PhotoOptions) => (
              <div key={photo.id}>
                <MemoizedChildComponent
                  id={photo.id}
                  url={photo.url}
                  imgPortrait={photo.src?.portrait}
                />
              </div>
            ))}
      </PhotoContainerGrid>
      <div style={{ position: 'sticky', top: 0, marginBottom: '5px' }}>
        {loadingPhotos && <StyledLinearProgress />}
      </div>
      {nextPage && (
        <button
          className='button_increase'
          onClick={() => setPageNumber((current) => current + 1)}>
          Load More...
        </button>
      )}
      {!loadingPhotos && (
        <IconButton>
          <a href='#navTop'>
            <ArrowUpwardIcon className='backTop' />
          </a>
        </IconButton>
      )}
    </PhotoContainer>
  )
}
function ChildComponent({ id, url, imgPortrait }: CardPhotoOptions) {
  return <CardPhoto id={id} url={url} imgPortrait={imgPortrait} />
}
const MemoizedChildComponent = React.memo(ChildComponent)
