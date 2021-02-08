import '../../src/styles/globals.css'
import '../components/PhotosContainer/PhotosContainer.scss'
import { AppProps } from 'next/app'
function MyApp({ Component, pageProps }:AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
