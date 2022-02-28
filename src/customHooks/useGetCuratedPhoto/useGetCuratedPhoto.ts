import { createClient } from 'pexels'
import { addPhotos, CuratedPhotoItems } from '../../redux/photoSlice'
import { useAppDispatch } from '../../store/store'
const client = createClient(
  '563492ad6f9170000100000170236dd5ebbc4d13936b1f6d2e44461c'
)

export default function useGetCuratedPhoto() {
  let dispatch = useAppDispatch()
  const getCuratedPhoto = (pageNumber: number) => {
    dispatch(
      addPhotos(<Pick<CuratedPhotoItems, 'loading' | 'photos'>>{
        loading: true,
      })
    )
    client.photos
      .curated({ per_page: 20, page: pageNumber })
      .then((photos) => {
        dispatch(
          addPhotos(<Pick<CuratedPhotoItems, 'loading' | 'photos'>>{
            loading: false,
            photos: photos,
          })
        )
      })
      .catch((err) => {
        dispatch(
          addPhotos(<Pick<CuratedPhotoItems, 'loading' | 'photos'>>{
            loading: false,
          })
        )
        alert(err)
      })
  }
  return {
    getCuratedPhoto,
  }
}
