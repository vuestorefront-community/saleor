import gql from 'graphql-tag';
import mutation from './defaultMutation';
import { CheckoutLineDelete } from '../../types/GraphQL';
import { Context } from '@vue-storefront/core';

const checkoutLineDelete = async (
  { client }: Context,
  checkoutId: string,
  lineId: string
): Promise<CheckoutLineDelete> => {
  const variables = {
    checkoutId: checkoutId,
    lineId
  };

  const response = await client.mutate({
    mutation: gql`
      ${mutation}
    `,
    variables,
    fetchPolicy: 'no-cache'
  });

  return response.data.checkoutLineDelete;
};

export default checkoutLineDelete;
