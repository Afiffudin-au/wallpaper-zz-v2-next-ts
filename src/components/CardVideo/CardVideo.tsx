import React from 'react'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import { IconButton } from '@material-ui/core'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import { CardVideoOptions } from '../VideosContainer/VideosContainer'
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
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
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
function CardVideo({ id, url, image }: CardVideoOptions) {
  const handleDetail = () => {}
  return (
    <CardVideoStyled>
      <Wrapper>
        <Image src={image} alt={image} />
        <PlayBox>
          <IconButton onClick={handleDetail}>
            <PlayCircleOutlineIcon className='CardVideo__playIcon' />
          </IconButton>
        </PlayBox>
      </Wrapper>
    </CardVideoStyled>
  )
}

export default CardVideo
