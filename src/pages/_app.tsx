import '../../src/styles/globals.scss'
import { AppProps } from 'next/app'
import store from '../store/store'
import { Provider } from 'react-redux'
import * as React from 'react'
import Head from 'next/head'
import Error from 'next/error'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
const progress = new ProgressBar({
  size: 4,
  color: '#59aefe',
  className: 'z-50',
  delay: 100,
})
Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)
function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    )
  }
  return (
    <Provider store={store}>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <meta
          name='Description'
          content='wallpaper-zz-next provides wallpapers, videos, modern preview,free download,high resolutions,and search.'
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
