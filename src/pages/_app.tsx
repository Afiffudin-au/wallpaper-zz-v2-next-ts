import '../../src/styles/globals.scss'
import { AppProps } from 'next/app'
import store from '../store/store'
import { Provider } from 'react-redux'
import * as React from 'react'
import Head from 'next/head'
function MyApp({ Component, pageProps }: AppProps) {
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
