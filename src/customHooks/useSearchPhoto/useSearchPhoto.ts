import { createClient } from 'pexels'
import { addResultSearch, PhotoSearchItems } from '../../redux/photoSlice'
import { useAppDispatch } from '../../store/store'
const client = createClient(
  '563492ad6f9170000100000170236dd5ebbc4d13936b1f6d2e44461c'
)
export function useGetSearchPhotos() {
  const dispatch = useAppDispatch()
  const getSearchPhotos = (query: string, pageNumber: number) => {
    dispatch(
      addResultSearch(<PhotoSearchItems>{
        loading: true,
      })
    )
    client.photos
      .search({ query, per_page: 20, page: pageNumber })
      .then((photos: any) => {
        dispatch(
          addResultSearch(<PhotoSearchItems>{
            loading: false,
            dataPhotosResult: photos,
            query: query,
            totalResults: photos.total_results,
          })
        )
      })
      .catch((err) => {
        dispatch(
          addResultSearch(<PhotoSearchItems>{
            loading: false,
          })
        )
        alert(err)
      })
  }
  return { getSearchPhotos }
}
