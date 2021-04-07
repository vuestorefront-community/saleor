import {
  Context,
  useProductFactory,
  ProductsSearchParams,
  UseProductFactoryParams
} from '@vue-storefront/core';
import { ProductsResponse } from '../types';
import enhanceProduct from '../helpers';

const params: UseProductFactoryParams<ProductsResponse, any> = {
  productsSearch: async (context: Context, params: ProductsSearchParams): Promise<ProductsResponse> => {

    const productsEdges = await context.$saleor.api.getProduct(params);

    const productVariants = productsEdges.edges.flatMap((edge) =>
      enhanceProduct(edge.node)
    );

    return productVariants;

  }
};

export default useProductFactory<ProductsResponse, any>(params);
