import { AppProps } from 'next/app'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import './styles.css'
import Header from '../components/Header/Header'
import { globalStyles } from '@island.is/island-ui/core'
import { IntlProvider } from 'react-intl'
import { ApolloProvider } from '@apollo/client'
import { client } from '@island.is/application/graphql'
import { FormProvider } from '../components/Form'
import Header from '../components/Header/Header'

globalStyles()

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <IntlProvider locale="is">
        <ApolloProvider client={client}>
          <FormProvider>
      <Head>
        <title>Welcome to skattframtal!</title>
      </Head>
      <Header />
      <main className="app">
        <Component {...pageProps} />
      </main>
      <Footer />
          </FormProvider>
        </ApolloProvider>
      </IntlProvider>
    </>
  )
}

export default CustomApp
