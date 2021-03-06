import {
  ProductGetters,
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice
} from '@vue-storefront/core';
import {
  formatAttributeList,
  getVariantByAttributes,
  createPrice
} from './_utils';
import { ProductImage, ProductVariant } from '@vue-storefront/saleor-api';

interface ProductVariantFilters {
  master?: boolean;
  attributes?: Record<string, string>;
}

export const getProductName = (
  product: ProductVariant | Readonly<ProductVariant>
): string => (product as any)?.name || '';

export const getProductSlug = (
  product: ProductVariant | Readonly<ProductVariant>
): string => product.product.slug || '';

export const getProductPrice = (
  product: ProductVariant | Readonly<ProductVariant>
): AgnosticPrice => createPrice(product);

export const getProductGallery = (
  product: ProductVariant
): AgnosticMediaGalleryItem[] => {
  const images = product?.images || [];

  return images.map((image: ProductImage) => ({
    small: image.url,
    big: image.url,
    normal: image.url
  }));
};

export const getProductCoverImage = (product: ProductVariant): string =>
  product?.product.thumbnail?.url || '';

export const getProductFiltered = (
  variants: ProductVariant[],
  filters: ProductVariantFilters | any = {}
): ProductVariant[] => {
  if (!variants) {
    return [];
  }

  if (filters.attributes && Object.keys(filters.attributes).length > 0) {
    return [getVariantByAttributes(variants, filters.attributes)];
  }

  if (filters.master) {
    return variants.filter((variant) => {
      return variant.id === variant.product.defaultVariant?.id;
    });
  }

  return variants;
};

export const getProductAttributes = (
  products: ProductVariant[] | ProductVariant,
  filterByAttributeName?: string[]
): Record<string, AgnosticAttribute | string> => {
  const isSingleProduct = !Array.isArray(products);
  const productList = (isSingleProduct
    ? [products]
    : products) as ProductVariant[];

  if (!products || productList.length === 0) {
    return {} as any;
  }

  // TODO this no longer works and the characters are empty
  const formatAttributes = (product: ProductVariant): AgnosticAttribute[] =>
    formatAttributeList(product.attributes || []).filter((attribute) =>
      filterByAttributeName
        ? filterByAttributeName.includes(attribute.name)
        : attribute
    );

  const reduceToUniques = (prev, curr) => {
    const isAttributeExist = prev.some(
      (el) => el.name === curr.name && el.value === curr.value
    );

    if (!isAttributeExist) {
      return [...prev, curr];
    }

    return prev;
  };

  const reduceByAttributeName = (prev, curr) => ({
    ...prev,
    [curr.name]: isSingleProduct
      ? curr.value
      : [
        ...(prev[curr.name] || []),
        {
          value: curr.value,
          label: curr.label
        }
      ]
  });

  return productList
    .map((product) => formatAttributes(product))
    .reduce((prev, curr) => [...prev, ...curr], [])
    .reduce(reduceToUniques, [])
    .reduce(reduceByAttributeName, {});
};

export const getProductDescription = (product: ProductVariant): any =>
  (product as any)?.description || '';

export const getProductCategoryIds = (product: ProductVariant): string[] => {
  if (!product) {
    // TODO is this legit ?
    return [''];
  } else {
    return [product.product.category.id];
  }
};

export const getProductId = (product: ProductVariant): string =>
  (product as any)?.product.id || '';

export const getFormattedPrice = (price: number): string => (price as any) as string;

export const getTotalReviews = (product: ProductVariant): number =>
  (product as any)?._rating?.count || 0;

export const getAverageRating = (product: ProductVariant): number =>
  (product as any)?._rating?.averageRating || 0;

const productGetters: ProductGetters<ProductVariant, ProductVariantFilters> = {
  getName: getProductName,
  getSlug: getProductSlug,
  getPrice: getProductPrice,
  getGallery: getProductGallery,
  getCoverImage: getProductCoverImage,
  getFiltered: getProductFiltered,
  getAttributes: getProductAttributes,
  getDescription: getProductDescription,
  getCategoryIds: getProductCategoryIds,
  getId: getProductId,
  getFormattedPrice,
  getTotalReviews,
  getAverageRating
};

export default productGetters;
