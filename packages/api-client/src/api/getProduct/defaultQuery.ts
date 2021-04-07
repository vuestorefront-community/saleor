import gql from 'graphql-tag';
import { DefaultProductVariantFragment } from '../../fragments';

export default gql`
    ${DefaultProductVariantFragment}

    query Products($filter: ProductFilterInput, $first: Int) {
        products(filter: $filter, first: $first) {
            edges {
                node {
                    id
                    seoTitle
                    category {
                        id
                    }
                    seoDescription
                    name
                    description
                    slug
                    thumbnail {
                        url
                        alt
                    }
                    attributes {
                        attribute {
                            name
                        }
                        values {
                            name
                        }
                    }
                    updatedAt
                    images {
                        id
                        url
                        alt
                    }
                    variants {
                        ...DefaultProductVariantFragment
                    }
                    defaultVariant {
                        id
                    }
                }
            }
        }
    }
`;
