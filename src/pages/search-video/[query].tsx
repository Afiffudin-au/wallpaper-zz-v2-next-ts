import React, { useEffect, useState } from 'react'
import styles from './search-result-video.module.scss'
import { createClient } from 'pexels'
import { VideoInterfaces } from '../../components/VideosContainer/VideosContainer'
import CardVideo, {
  CardVideoOptions,
} from '../../components/CardVideo/CardVideo'
import Navbar from '../../components/Navbar/Navbar'
import useGetVideoSearch from '../../customHooks/useSearchVideo/useSearchVideo'
import { useSelector } from 'react-redux'
import {
  selectVideoSearchBlock,
  VideoSearchBlockItems,
} from '../../redux/videoSlice'
import { IconButton } from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { StyledLinearProgress } from '../../components/LoadingProgress/LoadingProgress'
const client = createClient(
  '563492ad6f9170000100000170236dd5ebbc4d13936b1f6d2e44461c'
)
function SearchResultVideo({ results, queryProps }: any) {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const {
    videos,
    totalResult: nextPage,
    query,
    loadingVideo,
  }: Partial<VideoSearchBlockItems> = useSelector(selectVideoSearchBlock)
  const { getVideoSearch } = useGetVideoSearch()
  let lengthPage = 0
  videos?.forEach((video) => {
    lengthPage += video?.length
  })
  useEffect(() => {
    setPageNumber(1)
  }, [queryProps])
  useEffect(() => {
    getVideoSearch(queryProps || query, pageNumber)
  }, [pageNumber, queryProps])
  return (
    <>
      <Navbar />
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
            : results.videos.map((video: VideoInterfaces) => (
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
    </>
  )
}
function ChildComponent({ id, url, image }: CardVideoOptions) {
  return <CardVideo id={id} url={url} image={image} />
}
const MemoizedChildComponent = React.memo(ChildComponent)
export const getServerSideProps = async ({ params }: any) => {
  const results = await client.videos
    .search({ query: params.query, per_page: 20, page: 1 })
    .then((videos) => {
      return videos
    })
    .catch((err) => {
      return false
    })
  if (!results) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      results,
      queryProps: params.query,
    },
  }
}
export default SearchResultVideo
