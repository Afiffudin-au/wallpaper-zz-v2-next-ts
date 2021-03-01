import SearchBanner from './SearchBanner'
import styled from 'styled-components'
const BannerWrap = styled.div`
  position: relative;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 1.15rem;
  padding-top: 74px;
  padding-bottom: 66px;
  color: #fff;
  background-color: #d3d3d3;
  text-decoration: none;
  height: 100%;
  max-height: 500px;
  min-height: 380px;
  z-index: 1;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.2) 100%
      ),
      linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
    z-index: 2;
  }
`
const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  // -o-object-fit: cover;
  object-fit: fill;
  background: #232a34;
`
const BannerContent = styled.div`
  max-width: 650px;
  width: 100%;
  z-index: 3;
  .title {
    margin-bottom: 10px;
  }
`
const Suggestion = styled.div`
  margin-top: 10px;
  .suggestion__header {
    margin-right: 10px;
    font-size: 15px;
    font-weight: 400;
    color: rgb(30, 212, 188);
  }
  .suggestion__title {
    font-size: 14px;
    font-weight: 400;
    color: rgb(173, 173, 173);
  }
`
function Banner() {
  return (
    <BannerWrap id='navTop'>
      <Background>
        <Image
          src='https://images.pexels.com/photos/5629220/pexels-photo-5629220.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
          alt='background'
        />
      </Background>
      <BannerContent>
        <div className='title'>
          <h1>The free stock wallpapers & videos</h1>
        </div>
        <SearchBanner />
        <Suggestion>
          <span className='suggestion__header'>Suggested:</span>
          <span className='suggestion__title'>
            outdoors portrait travel black-and-white people boy more
          </span>
        </Suggestion>
      </BannerContent>
    </BannerWrap>
  )
}

export default Banner
