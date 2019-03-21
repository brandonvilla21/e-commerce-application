import withApollo from 'next-with-apollo'
import ApolloClient, { Operation }  from 'apollo-boost'

// TODO fix any type
function createClient(client: any) {
  const { headers } = client
  return new ApolloClient({
    uri: process.env.GRAPHQL_URL,
    request: (operation: Operation) => {
      return new Promise((resolve) => {
        operation.setContext({
          fetchOptions: {
            credentials: 'true'
          },
          headers,
        })
        resolve()
      })
    }
  })
}

export default withApollo(createClient)