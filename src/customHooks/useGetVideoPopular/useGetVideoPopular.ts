import { useAppDispatch } from '../../store/store'
import { createClient } from 'pexels'
const client = createClient(
  '563492ad6f9170000100000170236dd5ebbc4d13936b1f6d2e44461c'
)
import { addVideos, VideoActionItems } from '../../redux/videoSlice'
export function useGetVideoPopular() {
  const dispatch = useAppDispatch()
  const getVideoPopular = (pageNumber: number) => {
    dispatch(
      addVideos(<VideoActionItems>{
        loading: true,
      })
    )
    client.videos
      .popular({ per_page: 20, page: pageNumber })
      .then((videos) => {
        dispatch(
          addVideos(<VideoActionItems>{
            loading: false,
            dataVideo: videos,
          })
        )
      })
      .catch((err) => {
        dispatch(
          addVideos(<VideoActionItems>{
            loading: false,
          })
        )
        alert(err)
      })
  }
  return { getVideoPopular }
}
