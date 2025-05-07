import { AppProps } from 'next/app'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import Header from '../components/Header/Header'
import { globalStyles, ToastContainer } from '@island.is/island-ui/core'
import { ApolloProvider } from '@apollo/client'
import { client } from '@island.is/application/graphql'

globalStyles()

const CustomApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <ApolloProvider client={client}>
        <Head>
          <title>Welcome to skattframtal!</title>
        </Head>
        {router.pathname !== '/auth' && (
          <Header
            authenticated={router.pathname.startsWith(
              '/skattframtol/application',
            )}
          />
        )}
        <main className="app">
          <Component {...pageProps} />
          <ToastContainer />
        </main>
        {router.pathname !== '/auth' && <Footer />}
      </ApolloProvider>
    </>
  )
}

export default CustomApp
