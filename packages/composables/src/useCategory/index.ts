import {
  Context,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import { Category } from '../types';

const params: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context: Context, params) => {

    return await context.$saleor.api.getCategory(params);
  }
};

export default useCategoryFactory<Category, any>(params);
