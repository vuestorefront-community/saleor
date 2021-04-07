/* istanbul ignore file */

import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import { Coupon } from '../types';
import { Checkout, CheckoutLine, ProductVariant } from '@vue-storefront/saleor-api/src';

const params: UseCartFactoryParams<Checkout, CheckoutLine, ProductVariant, Coupon> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('Mocked: loadCart');
    console.log(context);
    return null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {

    const existingCheckoutId = currentCart?.id;

    // TODO set the total
    if (existingCheckoutId) {
      const checkoutLinesAdd = await context.$saleor.api.checkoutLinesAdd(
        existingCheckoutId,
        product.id,
        quantity
      );

      return checkoutLinesAdd.checkout;
    } else {
      const checkoutCreate = await context.$saleor.api.checkoutCreate(
        product.id,
        quantity
      );

      return checkoutCreate.checkout;
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    const checkoutLineDelete = await context.$saleor.api.checkoutLineDelete(
      currentCart.id,
      product.id
    );

    return checkoutLineDelete.checkout;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    const checkoutLinesUpdate = await context.$saleor.api.checkoutLinesUpdate(
      currentCart.id,
      product.variant.id,
      quantity
    );

    return checkoutLinesUpdate.checkout;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    console.log('Mocked: clearCart');
    return null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: applyCoupon');
    return {updatedCart: null, updatedCoupon: {}};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart, coupon, customQuery }) => {
    console.log('Mocked: removeCoupon');
    return {updatedCart: null};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (context: Context, { currentCart, product }) => {
    console.log('Mocked: isInCart');
    return false;
  }
};

export default useCartFactory<Checkout, CheckoutLine, ProductVariant, Coupon>(params);
