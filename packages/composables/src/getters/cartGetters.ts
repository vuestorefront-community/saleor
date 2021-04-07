import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticCoupon, AgnosticDiscount } from '@vue-storefront/core';
import { Cart, LineItem } from '@vue-storefront/saleor-api/src/types';
import { Checkout, CheckoutLine } from '@vue-storefront/saleor-api';
import { createPrice } from './_utils';
import { getProductAttributes } from './productGetters';

export const getCartItems = (checkout: Checkout): CheckoutLine[] => {
  if (!checkout) {
    return [];
  }

  return checkout.lines;
};

export const getCartItemName = (checkoutLine: CheckoutLine): string =>
  checkoutLine.variant.name;

export const getCartItemImage = (checkoutLine: CheckoutLine): string => {
  return checkoutLine.variant.product.thumbnail.url;
};

export const getCartItemPrice = (checkoutLine: CheckoutLine): AgnosticPrice =>
  createPrice(checkoutLine.variant);

export const getCartItemQty = (product: CheckoutLine): number =>
  product.quantity;

export const getCartItemAttributes = (
  product: CheckoutLine,
  filterByAttributeName?: Array<string>
) => getProductAttributes(product.variant, filterByAttributeName);

export const getCartItemSku = (product: CheckoutLine): string =>
  product.variant.sku;

export const getCartTotals = (checkout: Checkout): AgnosticTotals => {
  if (!checkout) {
    return {
      total: 0,
      subtotal: 0,
      special: 0
    };
  }

  // TODO calculate
  return {
    total: 0,
    subtotal: 0,
    special: 0
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartShippingPrice = (cart: Cart): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotalItems = (cart: Checkout): number => cart?.lines?.length || 0;

export const getFormattedPrice = (price: number): string => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCoupons = (cart: Cart): AgnosticCoupon[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDiscounts = (cart: Cart): AgnosticDiscount[] => [];

const cartGetters: CartGetters<Cart, LineItem> = {
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getFormattedPrice: getFormattedPrice,
  getTotalItems: getCartTotalItems,
  getCoupons,
  getDiscounts
};

export default cartGetters;
