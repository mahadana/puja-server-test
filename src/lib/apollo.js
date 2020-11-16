import { withApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api/graphql",
});

export default withApollo(apolloClient);
