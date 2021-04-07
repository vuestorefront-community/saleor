import gql from 'graphql-tag';
import mutation from './defaultMutation';
import { CheckoutLinesAdd } from '../../types/GraphQL';
import { Context } from '@vue-storefront/core';

const checkoutsLinesAdd = async (
  { client }: Context,
  checkoutId: string,
  productVariantId: string,
  quantity: number
): Promise<CheckoutLinesAdd> => {
  const variables = {
    checkoutId: checkoutId,
    variantId: productVariantId,
    quantity: quantity
  };

  const response = await client.mutate({
    mutation: gql`
      ${mutation}
    `,
    variables,
    fetchPolicy: 'no-cache'
  });

  return response.data.checkoutLinesUpdate;
};

export default checkoutsLinesAdd;
