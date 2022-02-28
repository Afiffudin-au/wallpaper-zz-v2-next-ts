import React, { useState } from 'react'
import styled from 'styled-components'
import useGetPhotoDetail from '../../customHooks/useGetPhotoDetail/useGetPhotoDetail'
import { Modal } from '@material-ui/core'
import ModalDetail from '../ModalDetail/ModalDetail'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import LazyLoad from 'react-lazyload'
const CardPhotoStyled = styled.div`
  margin-bottom: 10px;
  flex-grow: 1;
  cursor: pointer;
  &:hover {
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: scale3d(1.02, 1.04, 1.06);
    img {
      opacity: 1;
      object-fit: fill;
      border-radius: 0;
    }
  }
`
const ImageCard: any = styled.img`
  opacity: 0.99;
  border-radius: 0.5rem;
  background: #232a34;
  width: 100%;
  height: 100%;
`
export interface CardPhotoOptions {
  id: string | number | undefined
  url: string | number | undefined
  imgPortrait: string | number | undefined
}
function CardPhoto({ id, url, imgPortrait }: CardPhotoOptions) {
  const [imageLoad, setImageLoad] = useState<boolean>(false)
  const [display, setDisplay] = useState<string>('none')
  const [open, setOpen] = React.useState(false)
  const { getPhotoDetail } = useGetPhotoDetail()
  const handleClose = () => {
    setOpen(false)
  }
  const handleDetail = () => {
    setOpen(true)
    getPhotoDetail(id)
  }
  const handleImageLoad = () => {
    setImageLoad(true)
    setDisplay('block')
  }
  return (
    <>
      <CardPhotoStyled onClick={handleDetail}>
        {!imageLoad && (
          <SkeletonTheme color='#202020' highlightColor='#444'>
            <Skeleton count={1} height={'600px'} width={'100%'} />
          </SkeletonTheme>
        )}
        <LazyLoad offset={600}>
          <ImageCard
            style={{ display: display }}
            onLoad={handleImageLoad}
            src={imgPortrait}
            alt={url}
          />
        </LazyLoad>
      </CardPhotoStyled>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        style={{ overflowY: 'scroll' }}>
        <ModalDetail handleClose={handleClose} />
      </Modal>
    </>
  )
}

export default CardPhoto
