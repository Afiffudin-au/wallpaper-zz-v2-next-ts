import { createClient } from 'pexels';
const client = createClient('563492ad6f9170000100000170236dd5ebbc4d13936b1f6d2e44461c');
export function useGetPhotoDetail(){
  const getPhotoDetail = (id:string | number)=>{
    client.photos.show({ id: id }).then(photo => {
     
    }).catch(err=>{
      
      alert(err)
    });
  }
  return {getPhotoDetail}
}