import React, { useState } from 'react'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import { IconButton } from '@material-ui/core'
import styled from 'styled-components'
import Link from 'next/link'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import LazyLoad from 'react-lazyload'
const CardVideoStyled = styled.div`
  margin-bottom: 10px;
  flex-grow: 1;
  cursor: pointer;
  .CardVideo__playBox {
  }
`
const Wrapper = styled.div`
  position: relative;
`
const Image: any = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 5px;
`
const PlayBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .CardVideo__playIcon {
    color: white;
    font-size: 47px;
    font-weight: bold;
    transition: color 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:hover {
      color: rgb(10, 131, 245);
    }
  }
`
export interface CardVideoOptions {
  id: string | number | undefined
  url: string | number | undefined
  image: string | number | undefined
}
function CardVideo({ id, url, image }: CardVideoOptions) {
  const [imageLoad, setImageLoad] = useState<boolean>(false)
  const [display, setDisplay] = useState<string>('none')
  const handleImageLoad = () => {
    setImageLoad(true)
    setDisplay('block')
  }
  return (
    <CardVideoStyled>
      <Wrapper>
        {!imageLoad && (
          <SkeletonTheme color='#202020' highlightColor='#444'>
            <Skeleton count={1} height={'225px'} width={'100%'} />
          </SkeletonTheme>
        )}
        <Image
          style={{ display: display }}
          onLoad={handleImageLoad}
          src={image}
          alt={image}
        />
        {imageLoad && (
          <PlayBox>
            <Link href={`/video-detail/${id}`}>
              <IconButton>
                <PlayCircleOutlineIcon className='CardVideo__playIcon' />
              </IconButton>
            </Link>
          </PlayBox>
        )}
      </Wrapper>
    </CardVideoStyled>
  )
}

export default CardVideo
