/* eslint-disable camelcase */

import ApolloClient, { ApolloClientOptions } from 'apollo-client';

export type ClientInstance = ApolloClient<any>

export interface ApiConfig {
  uri: string;
  authHost: string;
  projectKey: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
}

export interface CookiesConfig {
  currencyCookieName: string;
  countryCookieName: string;
  localeCookieName: string;
}

export interface LocaleItem {
  name: string;
  label: string;
}

export interface Auth {
  onTokenChange?: (token: string) => void;
  onTokenRead?: () => string;
  onTokenRemove?: () => void;
}

export interface Config<T = any> {
  client?: ApolloClient<T>;
  api: ApiConfig;
  customOptions?: ApolloClientOptions<any>;
  currency: string;
  locale: string;
  country: string;
  countries: LocaleItem[];
  currencies: LocaleItem[];
  locales: LocaleItem[];
  languageMap: Record<string, string>;
  acceptLanguage: string[];
  cookies: CookiesConfig;
  auth?: Auth;
  forceToken?: boolean;
  setGuestCheckoutToken: (string) => void;
  getGuestCheckoutToken: () => string;
  removeGuestCheckoutToken: () => void;
}
