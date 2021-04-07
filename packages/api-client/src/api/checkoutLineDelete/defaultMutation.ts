import gql from 'graphql-tag';
import { DefaultProductVariantFragment } from '../../fragments';

export default gql`
  ${DefaultProductVariantFragment}

  mutation checkoutLineDelete(
      $checkoutId: ID!, $lineId: ID!
  ) {
      checkoutLineDelete(checkoutId: $checkoutId, lineId: $lineId) {
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
