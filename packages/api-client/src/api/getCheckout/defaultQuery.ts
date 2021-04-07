import gql from 'graphql-tag';
import { DefaultGuestCheckoutFragment } from '../../fragments';

export default gql`
  ${DefaultGuestCheckoutFragment}

  query Checkout($token: UUID!) {
    checkout(token: $token) {
      ...DefaultGuestCheckout
    }
  }
`;
