import { AgnosticAttribute, AgnosticPrice } from '@vue-storefront/core';
import {
  Attribute,
  ProductVariant,
  SelectedAttribute
} from '@vue-storefront/saleor-api';

export const getAttributeValue = (attribute: Attribute): string => {
  // TODO array?
  return attribute.values ? attribute.values[0] : '';
};

export const formatAttributeList = (
  attributes: Array<SelectedAttribute>
): AgnosticAttribute[] =>
  attributes.map((attr) => {
    const attrValue = getAttributeValue(attr.attribute);
    return {
      name: attr.attribute.name,
      value: attrValue,
      label: attr.attribute.name
    };
  });

export const getVariantByAttributes = (
  products: ProductVariant[] | Readonly<ProductVariant[]>
): ProductVariant => {

  if (!products || products.length === 0) {
    return null;
  }

  return products.find((productVariant: ProductVariant) => {
    return productVariant;
  });
};

export const createPrice = (variant: ProductVariant): AgnosticPrice => {
  if (!variant || !variant.pricing) {
    return { regular: null, special: null };
  }

  const regularPrice = variant.pricing.price.net.amount || 0;
  const specialPrice = variant.pricing?.discount?.net?.amount || 0;

  return {
    regular: regularPrice,
    special: specialPrice
  };
};
