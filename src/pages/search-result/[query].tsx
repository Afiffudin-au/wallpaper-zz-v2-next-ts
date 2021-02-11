import React from 'react'
import { createClient } from 'pexels'
import styles from './search-result.module.scss'
import { CardPhotoType } from '../../components/PhotosContainer/PhotosContainer'
import CardPhoto from '../../components/CardPhoto/CardPhoto'
import Navbar from '../../components/Navbar/Navbar'
const client = createClient(
  '563492ad6f9170000100000170236dd5ebbc4d13936b1f6d2e44461c'
)
function SearchResult({ results }: any) {
  console.log(results)
  return (
    <>
      <Navbar />
      <div className={styles.SearchPhotos}>
        {/* {totalResults === 0 && <p>Sorry We Cannot Find...</p>} */}
        <div className={styles.SearchPhotos__grid}>
          {/* {photos?.map((photo) =>
          photo.map((photo) => (
            <div key={photo.id}>
              <MemoizedChildComponent
                id={photo.id}
                url={photo.url}
                imgPortrait={photo.src.portrait}
              />
            </div>
          ))
        )} */}
          {results.photos.map((photo: CardPhotoType, index: number) => (
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
          {/* {loadingPhotos && <LinearProgress color='secondary' />} */}
        </div>
        {/* {nextPage && (
        <button
          className={styles.button_increase}
          onClick={() => setPageNumber((current) => current + 1)}>
          Load More...
        </button>
      )} */}
      </div>
    </>
  )
}
function ChildComponent({ id, url, imgPortrait }: CardPhotoType) {
  return <CardPhoto id={id} url={url} imgPortrait={imgPortrait} />
}
const MemoizedChildComponent = React.memo(ChildComponent)

export const getServerSideProps = async ({ params }: any) => {
  const results = await client.photos
    .search({ query: params.query, per_page: 20, page: 1 })
    .then((photos) => {
      return photos
    })
    .catch((err: any) => {
      alert(err)
    })
  console.log(results)
  return {
    props: {
      results,
    },
  }
}
export default SearchResult
