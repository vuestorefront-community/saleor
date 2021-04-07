import gql from 'graphql-tag';
import { CheckoutCreate } from '../../';
import mutation from './defaultMutation';
import { Context } from '@vue-storefront/core';

const checkoutCreate = async (
  { config, client } : Context,
  productVariantId: string,
  quantity: number
): Promise<CheckoutCreate> => {
  const variables = {
    variantId: productVariantId,
    quantity: quantity,
    email: ''
  };

  const isGuest = !config.auth.onTokenRead();
  if (isGuest) {
    // TODO saleor needs a dummy email in order to create a guest checkout. Need to check if has to be different for each client
    variables.email = 'dummy@example.com';
  }

  const response = await client.mutate({
    mutation: gql`
      ${mutation}
    `,
    variables,
    fetchPolicy: 'no-cache'
  });

  if (response.data.checkoutCreate.checkout.email === 'dummy@example.com') {
    // we don't report the dummy email to the client
    response.data.checkoutCreate.checkout.email = null;
  }

  return response.data.checkoutCreate;
};

export default checkoutCreate;
