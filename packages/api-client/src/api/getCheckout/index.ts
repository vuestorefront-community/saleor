
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import query from './defaultQuery';
import { Checkout } from '../../types/GraphQL';
import { Context } from '@vue-storefront/core';

const getCheckout = async ({ client }: Context, token: string): Promise<Checkout> => {
  const variables = {
    token: token
  };

  const response = await (client as ApolloClient<any>).query({
    query: gql`
      ${query}
    `,
    variables,
    // temporary, seems like bug in apollo:
    // @link: https://github.com/apollographql/apollo-client/issues/3234
    fetchPolicy: 'no-cache'
  });

  console.log('GETTING REMOTE CHECKOUT');

  return response.data.checkout;
};

export default getCheckout;
