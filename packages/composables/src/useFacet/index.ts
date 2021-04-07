import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import enhanceProduct from '../helpers';

// TODO: move to the config file
const ITEMS_PER_PAGE = [10, 50, 100];

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {

    const itemsPerPage = params.input.itemsPerPage;

    const category = await context.$saleor.api.getCategory({
      slug: params.input.categorySlug
    });

    // TODO input filters

    const products = await context.$saleor.api.getProduct({
      catId: category.id,
      limit: itemsPerPage,
      offset: (params.input.page - 1) * itemsPerPage
      //    filters
      // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4857
      // sort: params.sort
    });

    const productVariants = products.edges.map(edge => edge.node).flatMap(enhanceProduct);

    // TODO facets

    return {
      products: productVariants,
      categories: [category],
      facets: {},
      total: productVariants.length,
      perPageOptions: ITEMS_PER_PAGE,
      itemsPerPage
    };

  }
};

export default useFacetFactory<any>(factoryParams);
