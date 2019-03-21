import React from 'react'
import App, { Container, NextAppContext } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import { WithApolloClient } from 'react-apollo/withApollo'
import withApollo from '../lib/withApollo'
import Page from '../components/Page'
import { ApolloClient } from 'apollo-boost'

interface MyAppProps {
  apollo: ApolloClient<any>
}
class MyApp extends App<WithApolloClient<MyAppProps>> {
  static async getInitialProps(context: NextAppContext) {
    const { Component, ctx } = context
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)