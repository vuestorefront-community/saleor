import gql from 'graphql-tag';

export const DefaultGuestCheckoutFragment = gql`
  fragment DefaultGuestCheckout on Checkout {
    id
    token
    email
    lines {
      id
      quantity
      variant {
        id
        name
        sku
        attributes {
          attribute {
            id
            name
          }
          values {
            id
            name
          }
        }
        product {
          id
          name
          attributes {
            attribute {
              id
              name
            }
            values {
              id
              name
            }
          }
          thumbnail {
            url
          }
        }
        images {
          id
          url
          sortOrder
        }
        pricing {
          price {
            net {
              amount
            }
          }
        }
      }
    }
    shippingPrice {
      net {
        amount
        currency
      }
    }
    shippingAddress {
      id
      firstName
      lastName
      companyName
      streetAddress1
      streetAddress2
      city
      cityArea
      postalCode
      country {
        code
        country
      }
      countryArea
      phone
    }
    billingAddress {
      id
      firstName
      lastName
      companyName
      streetAddress1
      streetAddress2
      city
      cityArea
      postalCode
      country {
        code
        country
      }
      countryArea
      phone
    }
    shippingMethod {
      id
      name
      price {
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
`;

export const DefaultUserFragment = gql`
  fragment DefaultUserFragment on User {
    id
    email
    firstName
    lastName
    addresses {
      firstName
      lastName
      companyName
      streetAddress1
      streetAddress2
      city
      cityArea
      postalCode
      country {
        code
        country
      }
      phone
      isDefaultShippingAddress
      isDefaultBillingAddress
    }
  }
`;

export const DefaultProductVariantFragment = gql`
  fragment DefaultProductVariantFragment on ProductVariant {
    id
    name
    sku
    product {
      thumbnail {
        url
      }
    }  
    attributes {
      attribute {
        id
        name
      }
      values {
        id
        name
      }
    }
      
    images {
      id
      url
      sortOrder
    }
    pricing {
      price {
        net {
          amount
        }
      }
      discount {
        net {
          currency
          amount
        }
      }
    }
  }
`;
