import { IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import { useStylesModal } from '../../customHooks/useModalStyle/ModalStyle'
import styles from './ModalDetail.module.scss'
import CloseIcon from '@material-ui/icons/Close'
import { useSelector } from 'react-redux'
import { LinearProgress } from '@material-ui/core'
import {
  selectPhotoDetailsBlock,
  PhotosDetailBlockItem,
} from '../../redux/photoSlice'
import useGetDownloadPhoto from '../../customHooks/useGetDownloadPhoto/useGetDownloadPhoto'
function ModalDetail({ handleClose }: any) {
  const [previewUrl, setPreview] = useState<string>('')
  const { photos, loadingPhotos }: Partial<PhotosDetailBlockItem> = useSelector(
    selectPhotoDetailsBlock
  )
  const classes = useStylesModal()
  const { getDownloadPhoto, loadingDownload } = useGetDownloadPhoto()
  const handlePreview = (url: string) => {
    setPreview(url)
  }
  return (
    <div className={classes.paper + ` ${styles.ModalDetail}`}>
      {loadingPhotos && (
        <div className={styles.loadingPhotos}>
          <LinearProgress color='primary' />
        </div>
      )}
      {loadingDownload && (
        <div
          style={{ marginBottom: '8px', position: 'sticky', top: '0' }}
          className='loading'>
          <LinearProgress color='primary' />
        </div>
      )}
      <div className={styles.close}>
        <IconButton onClick={handleClose} className={styles.close_icon}>
          <CloseIcon style={{ color: 'white' }} />
        </IconButton>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          {previewUrl ? (
            <img src={previewUrl} alt={previewUrl} />
          ) : (
            <img src={photos.src?.portrait} alt={photos.src?.portrait} />
          )}
        </div>
        <div className={styles.Preview}>
          {Object.keys(photos.src || {}).map((size, index) => (
            <button
              key={index}
              className={styles.buttonPreview}
              onClick={() => handlePreview(photos.src[size])}
              disabled={loadingDownload}>
              Preview {size}
            </button>
          ))}
        </div>
        <div className={styles.downloadContainer}>
          {Object.keys(photos.src || {}).map((size, index) => (
            <button
              key={index}
              className={styles.buttonDownload}
              onClick={() => getDownloadPhoto(photos.src[size])}
              disabled={loadingDownload}>
              Download {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ModalDetail
