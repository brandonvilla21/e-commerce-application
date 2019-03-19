import React from 'react'
import App, { Container, NextAppContext } from 'next/app'
import Page from '../components/Page'

class MyApp extends App {
  static async getInitialProps(context: NextAppContext) {
    const { Component, ctx } = context
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Container>
    )
  }
}

export default MyApp