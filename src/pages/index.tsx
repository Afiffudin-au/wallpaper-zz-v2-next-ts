import Head from 'next/head'
import Banner from '../components/Banner/Banner'
import Navbar from '../components/Navbar/Navbar'
import NavigationTab from '../components/NavigationTab/NavigationTab'
import { createClient } from 'pexels';
import styled from 'styled-components';;
import PhotosContainer from '../components/PhotosContainer/PhotosContainer';
const client = createClient('563492ad6f9170000100000170236dd5ebbc4d13936b1f6d2e44461c');
export default function Home({dataPhotos}:any) {
  return (
    <div className="home">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <Banner/>
      <NavigationTab dataPhotos={dataPhotos}/>
    </div>
  )
}
export const getStaticProps = async ()=>{
  // const dataPhotos = await client.photos.curated({ per_page: 20,page : 1 }).then(photos => {
  //   return photos
  // })
  return{
    props : {
      dataPhotos
    }
  }
}
