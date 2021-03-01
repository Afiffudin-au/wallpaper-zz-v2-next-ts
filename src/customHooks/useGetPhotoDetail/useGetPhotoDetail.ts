import { createClient } from 'pexels'
import { addPhotoDetails, PhotoDetailItems } from '../../redux/photoSlice'
import { useAppDispatch } from '../../store/store'
const client = createClient(
  '563492ad6f9170000100000170236dd5ebbc4d13936b1f6d2e44461c'
)
export function useGetPhotoDetail() {
  const dispatch = useAppDispatch()
  const getPhotoDetail = (id: any) => {
    dispatch(
      addPhotoDetails(<PhotoDetailItems>{
        loading: true,
      })
    )
    client.photos
      .show({ id: id })
      .then((photo) => {
        dispatch(
          addPhotoDetails(<PhotoDetailItems>{
            loading: false,
            dataPhotoDetails: photo,
          })
        )
      })
      .catch((err) => {
        alert(err)
      })
  }
  return { getPhotoDetail }
}
