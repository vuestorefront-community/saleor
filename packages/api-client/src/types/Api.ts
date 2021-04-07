import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import {
  ShippingMethod,
  OrderCountableConnection,
  AccountRegister,
  CreateToken,
  Maybe,
  Category,
  ProductCountableConnection,
  Checkout,
  AddressInput,
  PaymentGateway,
  PaymentInput,
  User,
  AccountInput,
  AccountUpdate,
  CheckoutBillingAddressUpdate,
  CheckoutComplete,
  CheckoutCreate,
  CheckoutLinesAdd,
  CheckoutEmailUpdate,
  CheckoutPaymentCreate,
  CheckoutShippingAddressUpdate,
  CheckoutShippingMethodUpdate,
  Product, CheckoutLinesUpdate, CheckoutLineDelete
} from './GraphQL';
import { ProductsSearchParams } from '@vue-storefront/core';

export interface ApiInstance {
  accountRegister(email: string, password: string): Promise<AccountRegister>;
  accountUpdate(input: AccountInput): Promise<AccountUpdate>;
  checkoutBillingAddressUpdate(
    checkoutId: string,
    billingAddress: AddressInput
  ): Promise<CheckoutBillingAddressUpdate>;
  checkoutComplete(checkoutId: string): Promise<CheckoutComplete>;
  checkoutCreate(
    productVariantId: string,
    quantity: number
  ): Promise<CheckoutCreate>;
  checkoutEmailUpdate(
    checkoutId: string,
    email: string
  ): Promise<CheckoutEmailUpdate>;
  checkoutLinesAdd(
    checkoutId: string,
    productVariantId: string,
    quantity: number
  ): Promise<CheckoutLinesAdd>;

  checkoutLineDelete(
    checkoutId: string,
    checkoutLineId: string
  ): Promise<CheckoutLineDelete>;

  checkoutLinesUpdate(
    checkoutId: string,
    productVariantId: string,
    quantity: number
  ): Promise<CheckoutLinesUpdate>;

  checkoutPaymentCreate(
    checkoutId: string,
    paymentInput: PaymentInput
  ): Promise<CheckoutPaymentCreate>;

  checkoutShippingAddressUpdate(
    checkoutId: string,
    shippingAddress: AddressInput
  ): Promise<CheckoutShippingAddressUpdate>;

  checkoutShippingMethodUpdate(
    checkoutId: string,
    checkoutMethodId: string
  ): Promise<CheckoutShippingMethodUpdate>;

  getCategory(params): Promise<Maybe<Category>>;

  getCheckout(token: string): Promise<Maybe<Checkout>>;

  getMe(): Promise<User>;

  getOrders(params): Promise<OrderCountableConnection>;

  getPaymentGateways(checkoutToken: string): Promise<PaymentGateway[]>;

  getProduct(params): Promise<ProductCountableConnection>;

  queryProducts(
    params: ProductsSearchParams
  ): Promise<ProductCountableConnection>;

  queryProductVariants(productId: string): Promise<Product>;

  getShippingMethods(checkoutToken: string): Promise<ShippingMethod[]>;

  isGuest(): boolean;

  passwordChange(currentPassword: string, newPassword: string): Promise<User>;

  tokenCreate(email: string, password: string): Promise<CreateToken>;

  tokenRemove(): Promise<void>;
}

export interface BaseSearch {
  limit?: number;
  first?: number;
  endCursor?: string;
  offset?: number;
  sort?: string[];
}

export interface Filter {
  name: string;
  value: any;
}

export interface ProductWhereSearch extends BaseSearch {
  catId?: string;
  skus?: string[];
  slug?: string;
  id?: string;
  filters?: Filter[];
}

export interface FilterOption {
  label: string;
  value: string | number | boolean | [number, number] | [string, string];
  selected: boolean;
}

export interface CategoryWhereSearch extends BaseSearch {
  catId?: string;
  slug?: string;
}

export interface OrderWhereSearch extends BaseSearch {
  id?: string;
}

export type QueryResponse<K extends string, V> = ApolloQueryResult<
  Record<K, V>
>;
export type MutationResponse<K extends string, V> = FetchResult<Record<K, V>>;
