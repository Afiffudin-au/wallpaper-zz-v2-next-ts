import { useAppDispatch } from '../../store/store';
import {addVideoSearch,VideoSearchItems} from '../../redux/videoSlice'
import { createClient } from 'pexels';
const client = createClient('563492ad6f9170000100000170236dd5ebbc4d13936b1f6d2e44461c');
export function useGetVideoSearch(){
  const dispatch = useAppDispatch()
  const getVideoSearch = (query:string,pageNumber:number)=>{
    dispatch(addVideoSearch(<VideoSearchItems>{
      loading: true
    }))
    client.videos.search({ query, per_page: 20,page : pageNumber }).then((videos:any) => {
      dispatch(addVideoSearch(<VideoSearchItems>{
        loading: false,
        dataVideo : videos,
        query : query,
      }))
    }).catch(err=>{
      dispatch(addVideoSearch(<VideoSearchItems>{
        loading: false
      }))
      alert(err)
    });
  }
  return{
    getVideoSearch
  }
}