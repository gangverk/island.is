import { AppProps } from 'next/app'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import './styles.css'
import Header from '../components/Header/Header'
import { globalStyles } from '@island.is/island-ui/core'
import { ApolloProvider } from '@apollo/client'
import { client } from '@island.is/application/graphql'

globalStyles()

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ApolloProvider client={client}>
        <Head>
          <title>Welcome to skattframtal!</title>
        </Head>
        <Header />
        <main className="app">
          <Component {...pageProps} />
        </main>
        <Footer />
      </ApolloProvider>
    </>
  )
}

export default CustomApp
