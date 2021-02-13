import '../../src/styles/globals.scss'
import { AppProps } from 'next/app'
import store from '../store/store'
import { Provider } from 'react-redux'
import * as React from 'react'
import Head from 'next/head'
import Error from 'next/error'
import Router from 'next/router'
import { LinearProgress } from '@material-ui/core'
function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = React.useState(false)
  if (pageProps.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    )
  }
  React.useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])
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
      {loading && <LinearProgress color='secondary' />}
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
