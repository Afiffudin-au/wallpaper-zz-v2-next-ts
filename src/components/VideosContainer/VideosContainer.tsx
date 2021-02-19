import React, { useEffect, useState } from 'react'
import styles from './VideosContainer.module.scss'
import LinearProgress from '@material-ui/core/LinearProgress'
import { IconButton } from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import CardVideo, { CardVideoOptions } from '../CardVideo/CardVideo'
import { useGetVideoPopular } from '../../customHooks/useGetVideoPopular/useGetVideoPopular'
import { useSelector } from 'react-redux'
import {
  selectVideos,
  VideosBlockItems,
  addVideos,
} from '../../redux/videoSlice'
import { useAppDispatch } from '../../store/store'
import { StyledLinearProgress } from '../LoadingProgress/LoadingProgress'
export interface VideoInterfaces {
  id: string
  url: string
  image: string
}
function VideoContainer({ dataVideo }: any) {
  const dispatch = useAppDispatch()
  const { getVideoPopular } = useGetVideoPopular()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const {
    loadingVideo,
    totalResult: nextPage,
    videos,
  }: Partial<VideosBlockItems> = useSelector(selectVideos)
  let lengthPage = 0

  videos?.forEach((video) => {
    lengthPage += video?.length
  })
  useEffect(() => {
    dispatch(
      addVideos({
        removeCopyArray: true,
      })
    )
  }, [])
  useEffect(() => {
    getVideoPopular(pageNumber)
  }, [pageNumber])
  return (
    <div className={styles.VideoContainer}>
      <div className={styles.VideoContainer__grid}>
        {pageNumber > 1
          ? videos?.map((video) =>
              video.map((video: VideoInterfaces) => (
                <div key={video.id}>
                  <MemoizedChildComponent
                    id={video.id}
                    url={video.url}
                    image={video.image}
                  />
                </div>
              ))
            )
          : dataVideo.videos.map((video: VideoInterfaces, index: number) => (
              <div key={video.id}>
                <MemoizedChildComponent
                  id={video.id}
                  url={video.url}
                  image={video.image}
                />
              </div>
            ))}
      </div>
      <div style={{ position: 'sticky', top: 0, marginBottom: '5px' }}>
        {loadingVideo && <StyledLinearProgress />}
      </div>
      {nextPage && (
        <button
          className={styles.button_increase}
          onClick={() => setPageNumber((current) => current + 1)}>
          Load More...
        </button>
      )}
      {nextPage && (
        <p className={styles.VideoContainer__p1}>
          {lengthPage} of {nextPage} Videos...
        </p>
      )}
      {!loadingVideo && (
        <IconButton>
          <a href='#navTop'>
            <ArrowUpwardIcon className={styles.backTop} />
          </a>
        </IconButton>
      )}
    </div>
  )
}
function ChildComponent({ id, url, image }: CardVideoOptions) {
  return <CardVideo id={id} url={url} image={image} />
}
const MemoizedChildComponent = React.memo(ChildComponent)
export default VideoContainer
