import { AppProps } from 'next/app'
import Head from 'next/head'
import { Footer } from '../../components/Footer'
import './styles.css'

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
