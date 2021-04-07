import gql from 'graphql-tag';
import mutation from './defaultMutation';
import { CheckoutLinesAdd } from '../../types/GraphQL';
import { Context } from '@vue-storefront/core';

const checkoutLinesAdd = async (
  { client } : Context,
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

  if (response.data.checkoutLinesAdd.checkout.email === 'dummy@example.com') {
    // we don't report the dummy email to the client
    response.data.checkoutLinesAdd.checkout.email = null;
  }

  return response.data.checkoutLinesAdd;
};

export default checkoutLinesAdd;
