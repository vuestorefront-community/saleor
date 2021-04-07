import gql from 'graphql-tag';

const CHILDREN_CATEGORY_FRAGMENT = gql`
  fragment CategoryFields on Category {
    id
    slug
    name
  }

  fragment DefaultCategory on Category {
    ...CategoryFields
    children(first: 100) {
      edges {
        node {
          ...CategoryFields
          children(first: 100) {
            edges {
              node {
                ...CategoryFields
                children(first: 100) {
                  edges {
                    node {
                      ...CategoryFields
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default gql`
  ${CHILDREN_CATEGORY_FRAGMENT}

  query Category($slug: String!) {
    category(slug: $slug) {
      id
      name
      slug
      parent {
        ...DefaultCategory
        parent {
          ...DefaultCategory
          parent {
            ...DefaultCategory
          }
        }
      }
      # TODO are we going to have a problem with 100?
      children(first: 100) {
        edges {
          node {
            ...DefaultCategory
          }
        }
      }
    }
  }
`;
