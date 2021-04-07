import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import query from './queries';
import { Category } from '../..';
import { Context, ProductsSearchParams } from '@vue-storefront/core';

const getCategory = async (context: Context, params: ProductsSearchParams): Promise<Category> => {
  const variables = {
    slug: params.slug
  };

  const request = await (context.client as ApolloClient<any>).query({
    query: gql`
      ${query}
    `,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request.data.category;
};

export default getCategory;
