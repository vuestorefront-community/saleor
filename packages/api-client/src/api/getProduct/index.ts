import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import {
  ProductCountableConnection,
  ProductFilterInput
} from '../../';

import query from './defaultQuery';
import { Context, ProductsSearchParams } from '@vue-storefront/core';

const getProduct = async (
  context: Context,
  params: ProductsSearchParams
): Promise<ProductCountableConnection> => {
  const filter: ProductFilterInput = {};

  if (params.catId) {
    filter.categories = [params.catId];
  }

  if (params.id) {
    filter.ids = [params.id];
  }

  // TODO pagination
  const variables = {
    filter,
    first: 10
  };

  const response = await (context.client as ApolloClient<any>).query({
    query: gql`
        ${query}
    `,
    variables,
    // temporary, seems like bug in apollo:
    // @link: https://github.com/apollographql/apollo-client/issues/3234
    fetchPolicy: 'no-cache'
  });

  return response.data.products;
};

export default getProduct;

