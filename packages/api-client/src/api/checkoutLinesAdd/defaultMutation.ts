import gql from 'graphql-tag';
import { DefaultProductVariantFragment } from '../../fragments';

export default gql`
  ${DefaultProductVariantFragment}

  mutation checkoutLinesAdd(
    $checkoutId: ID!
    $variantId: ID!
    $quantity: Int!
  ) {
    checkoutLinesAdd(
      checkoutId: $checkoutId
      lines: [{ quantity: $quantity, variantId: $variantId }]
    ) {
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
          gross {
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
