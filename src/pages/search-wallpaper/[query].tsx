import React, { useEffect, useState } from 'react'
import { createClient } from 'pexels'
import styles from './search-result.module.scss'
import { PhotoOptions } from '../../components/PhotosContainer/PhotosContainer'
import CardPhoto, {
  CardPhotoOptions,
} from '../../components/CardPhoto/CardPhoto'
import Navbar from '../../components/Navbar/Navbar'
import { useGetSearchPhotos } from '../../customHooks/useSearchPhoto/useSearchPhoto'
import { useSelector } from 'react-redux'
import {
  selectPhotoSearchBlock,
  PhotosSearchBlockItem,
} from '../../redux/photoSlice'
import { LinearProgress } from '@material-ui/core'
import { StyledLinearProgress } from '../../components/LoadingProgress/LoadingProgress'
const client = createClient(
  '563492ad6f9170000100000170236dd5ebbc4d13936b1f6d2e44461c'
)
function SearchResult({ results, queryProps }: any) {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { getSearchPhotos } = useGetSearchPhotos()
  const {
    loadingPhotos,
    nextPage,
    photos,
    query,
    totalResults,
  }: Partial<PhotosSearchBlockItem> = useSelector(selectPhotoSearchBlock)
  useEffect(() => {
    setPageNumber(1)
  }, [queryProps])
  useEffect(() => {
    getSearchPhotos(queryProps || query, pageNumber)
  }, [pageNumber, queryProps])
  return (
    <>
      <Navbar />
      <div className={styles.SearchPhotos}>
        {totalResults === 0 && <p>Sorry We Cannot Find...</p>}
        <div className={styles.SearchPhotos__grid}>
          {pageNumber > 1
            ? photos?.map((photo) =>
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
            : results.photos.map((photo: PhotoOptions, index: number) => (
                <div key={photo.id}>
                  <MemoizedChildComponent
                    id={photo.id}
                    url={photo.url}
                    imgPortrait={photo?.src?.portrait}
                  />
                </div>
              ))}
        </div>
        <div style={{ position: 'sticky', top: 0, marginBottom: '5px' }}>
          {loadingPhotos && <StyledLinearProgress />}
        </div>
        {nextPage && (
          <button
            className={styles.button_increase}
            onClick={() => setPageNumber((current) => current + 1)}>
            Load More...
          </button>
        )}
      </div>
    </>
  )
}
function ChildComponent({ id, url, imgPortrait }: CardPhotoOptions) {
  return <CardPhoto id={id} url={url} imgPortrait={imgPortrait} />
}
const MemoizedChildComponent = React.memo(ChildComponent)

export const getServerSideProps = async ({ params }: any) => {
  const results = await client.photos
    .search({ query: params.query, per_page: 20, page: 1 })
    .then((photos) => {
      return photos
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
export default SearchResult
