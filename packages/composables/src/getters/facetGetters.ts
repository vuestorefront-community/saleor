import {
  FacetsGetters,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet, FacetSearchResult
} from '@vue-storefront/core';
import { getProductFiltered } from './productGetters';
import { getCategoryTree as buildCategoryTree } from './categoryGetters';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAll = (searchData: FacetSearchResult<any>, criteria?: string[]): AgnosticFacet[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getGrouped = (searchData: FacetSearchResult<any>, criteria?: string[]): AgnosticGroupedFacet[] =>[];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSortOptions = (searchData: FacetSearchResult<any>): AgnosticSort => ({ options: [], selected: '' });

const getCategoryTree = (searchData: FacetSearchResult<any>): AgnosticCategoryTree => {
  if (!searchData.data) {
    return {} as any;
  }

  return buildCategoryTree(searchData.data.categories[0]);
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getProducts = (searchData: FacetSearchResult<any>): any => {
  return getProductFiltered(searchData.data.products, { master: true });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPagination = (searchData: FacetSearchResult<any>): AgnosticPagination => ({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  pageOptions: []
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getBreadcrumbs = (searchData:FacetSearchResult<any>): AgnosticBreadcrumb[] => [];

const facetGetters: FacetsGetters<any, any> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};

export default facetGetters;
