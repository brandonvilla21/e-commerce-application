import withApollo from 'next-with-apollo'
import ApolloClient  from 'apollo-boost'

// TODO fix any type
function createClient(client: any) {
  const { headers } = client
  console.log(process.env.GRAPHQL_URL)
  return new ApolloClient({
    uri: process.env.GRAPHQL_URL,
    // Not working due incompatible Types
    // request: operation => {
    //   operation.setContext({
    //     fetchOptions: {
    //       credentials: 'true'
    //     },
    //     headers,
    //   })
    // }
  })
}

export default withApollo(createClient)