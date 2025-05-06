import { AppProps } from 'next/app'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import './styles.css'

import { globalStyles } from '@island.is/island-ui/core'

globalStyles()

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Welcome to skattframtal!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}

export default CustomApp
