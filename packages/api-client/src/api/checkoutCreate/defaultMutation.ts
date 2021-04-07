import gql from 'graphql-tag';
import { DefaultProductVariantFragment } from '../../fragments';

export default gql`
  ${DefaultProductVariantFragment}

  mutation($email: String!, $variantId: ID!, $quantity: Int!) {
    checkoutCreate(
      input: {
        email: $email
        lines: [{ quantity: $quantity, variantId: $variantId }]
      }
    ) {
      created
      checkout {
        id
        token
        email
        lines {
          id
          quantity
          variant {
            ...DefaultProductVariantFragment
          }
        }
        shippingPrice {
          net {
            amount
            currency
          }
        }
        quantity
        totalPrice {
          net {
            amount
          }
        }
      }
      checkoutErrors {
        field
        code
        message
      }
    }
  }
`;
