import React from 'react'
import {CardPhotoType} from '../PhotosContainer/PhotosContainer'
import styled from 'styled-components'
const CardPhotoStyled = styled.div`
  margin-bottom: 10px;
  flex-grow: 1;
  cursor: pointer;
  &:hover{
    transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: scale3d(1.02,1.04,1.06);
    img{
      opacity: 1;
      object-fit: fill;
      border-radius: 0;
    }
  }
`
const ImageCard = styled.img`
  opacity: 0.99;
  border-radius: 0.5rem;
  background: #232a34;
  width: 100%;
  height: 100%;
`
function CardPhoto({id,url,imgPortrait}:CardPhotoType) {
  const handleDetail = ()=>{
    
  }
  return (
    <CardPhotoStyled onClick={handleDetail}>
      <ImageCard src={imgPortrait} alt={url}/>
    </CardPhotoStyled>
  )
}

export default CardPhoto