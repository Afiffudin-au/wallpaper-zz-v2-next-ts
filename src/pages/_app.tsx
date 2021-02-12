import '../../src/styles/globals.scss'
import { AppProps } from 'next/app'
import store from '../store/store'
import { Provider } from 'react-redux'
import * as React from 'react'
import Head from 'next/head'
import Error from 'next/error'
function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    )
  }
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
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
