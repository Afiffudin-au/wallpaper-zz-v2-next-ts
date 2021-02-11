import React, { useEffect, useState } from 'react'
import styles from './VideosContainer.module.scss'
import LinearProgress from '@material-ui/core/LinearProgress'
import { IconButton } from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import CardVideo from '../CardVideo/CardVideo'
export interface CardVideoOptions {
  id: string
  url: string
  image: string
}
function VideoContainer({ dataVideo }: any) {
  return (
    <div className={styles.VideoContainer}>
      <div className={styles.VideoContainer__grid}>
        {dataVideo.videos.map((video: CardVideoOptions, index: number) => (
          <div key={video.id}>
            <MemoizedChildComponent
              id={video.id}
              url={video.url}
              image={video.image}
            />
          </div>
        ))}
      </div>

      {/* <div style={{ position: 'sticky', top: 0, marginBottom: '5px' }}>
        {loadingVideo && <LinearProgress color='secondary' />}
      </div>
      {nextPage && (
        <button
          className='button_increase'
          onClick={() => setPageNumber((current) => current + 1)}>
          Load More...
        </button>
      )}
      {nextPage && (
        <p className='VideoContainer__p1'>
          {lengthPage} of {nextPage} Videos...
        </p>
      )}
      {!loadingVideo && (
        <IconButton>
          <a href='#navTop'>
            <ArrowUpwardIcon className='backTop' />
          </a>
        </IconButton>
      )} */}
    </div>
  )
}
function ChildComponent({ id, url, image }: CardVideoOptions) {
  return <CardVideo id={id} url={url} image={image} />
}
const MemoizedChildComponent = React.memo(ChildComponent)
export default VideoContainer
