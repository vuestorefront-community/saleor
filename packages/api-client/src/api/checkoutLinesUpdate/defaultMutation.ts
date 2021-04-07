import gql from 'graphql-tag';
import { DefaultProductVariantFragment } from '../../fragments';

export default gql`
  ${DefaultProductVariantFragment}

  mutation checkoutLinesUpdate(
    $checkoutId: ID!
    $variantId: ID!
    $quantity: Int!
  ) {
      checkoutLinesUpdate(
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
