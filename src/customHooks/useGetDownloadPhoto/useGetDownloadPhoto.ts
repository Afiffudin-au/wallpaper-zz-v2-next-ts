import { useState } from 'react'
import { saveAs } from 'file-saver'
import Axios from 'axios'
export default function useGetDownloadPhoto() {
  const [loadingDownload, setLoadingDownload] = useState(false)
  const getDownloadPhoto = (url: string) => {
    setLoadingDownload(true)
    Axios({
      method: 'GET',
      url: url,
      responseType: 'blob',
    })
      .then((res) => {
        saveAs(res.data, 'image')
        setLoadingDownload(false)
      })
      .catch((err) => {
        setLoadingDownload(false)
        alert(err)
      })
  }
  return {
    getDownloadPhoto,
    loadingDownload,
  }
}
