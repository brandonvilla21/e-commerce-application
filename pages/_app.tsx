import '../lib/bootstrap';
// --- ^^^ must be at the top ^^^ ---

import React from 'react'
import App, { Container, NextAppContext } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import { WithApolloClient } from 'react-apollo/withApollo'
import withApollo from '../lib/withApollo'
import Page from '../components/Page'
import { ApolloClient } from 'apollo-boost'
import getPageContext from '../lib/getPageContext';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

interface MyAppProps {
  apollo: ApolloClient<any>
}
class MyApp extends App<WithApolloClient<MyAppProps>> {
  constructor() {
    // @ts-ignore
    super()
    this.pageContext = getPageContext()
  }
  
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

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
            {/* Wrap every page in Styles and Theme providers */}
            <StylesProvider
              generateClassName={this.pageContext.generateClassName}
              sheetsRegistry={this.pageContext.sheetsRegistry}
              sheetsManager={this.pageContext.sheetsManager}
            >
              {/* ThemeProvider makes the theme available down the React tree thanks to React context. */}
              <ThemeProvider theme={this.pageContext.theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component pageContext={this.pageContext} {...pageProps} />
              </ThemeProvider>
            </StylesProvider>
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)