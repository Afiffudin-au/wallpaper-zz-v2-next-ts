import { createClient } from 'pexels';
import { useState } from 'react';
const client = createClient('563492ad6f9170000100000170236dd5ebbc4d13936b1f6d2e44461c');
interface CuratedPhotoItems{
  loading : boolean
  next_page : number
  dataPhotos : any
  removeCopyArray : boolean
}
export interface CuratedPhotoOption{
  payload: CuratedPhotoItems;
}
export const useGetCuratedPhoto = ()=>{
  const [data,setData] = useState<any>([])
  const getCuratedPhoto = ()=>{
    client.photos.curated({ per_page: 20,page : 1 }).then(photos => {
      setData(photos)
    }).catch(err=>{
      alert(err)
    });
  }
  return{
    data,
    getCuratedPhoto
  }
}
