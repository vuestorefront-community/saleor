import { ApiClientExtension, apiClientFactory } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { Config, ClientInstance } from './types/setup';
import { createSaleorConnection } from './helpers/saleorLink';
import { defaultSettings } from './helpers/apiClient/defaultSettings';

import * as api from './api';

const onCreate = (
  settings: Config
): { config: Config; client: ClientInstance } => {
  const languageMap = settings.languageMap || {};
  const acceptLanguage =
    settings.acceptLanguage || defaultSettings.acceptLanguage;
  const locale = settings.locale || defaultSettings.locale;

  const config = ({
    ...defaultSettings,
    ...settings,
    languageMap,
    acceptLanguage: languageMap[locale] || acceptLanguage,
    auth: settings.auth || defaultSettings.auth
  } as any) as Config;

  if (settings.client) {
    return {
      client: settings.client,
      config
    };
  }

  if (settings.customOptions && settings.customOptions.link) {
    return {
      client: new ApolloClient({
        cache: new InMemoryCache(),
        ...settings.customOptions
      }),
      config
    };
  }

  const { apolloLink } = createSaleorConnection(config);

  const client = new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
    ...settings.customOptions
  });

  return {
    config,
    client
  };
};

const parseToken = (rawToken) => {
  try {
    return JSON.parse(rawToken);
  } catch (e) {
    return null;
  }
};

const tokenExtension: ApiClientExtension = {
  name: 'tokenExtension',
  hooks: (req, res) => {
    const rawCurrentToken = req.cookies['vsf-saleor-token'];
    const currentToken = parseToken(rawCurrentToken);

    return {
      beforeCreate: ({ configuration }) => ({
        ...configuration,
        auth: {
          onTokenChange: (newToken) => {
            if (!currentToken || currentToken !== newToken) {
              res.cookie('vsf-saleor-token', JSON.stringify(newToken));
            }
          },
          onTokenRead: () => {
            res.cookie('vsf-saleor-token', rawCurrentToken);
            return currentToken;
          },
          onTokenRemove: () => {
            res.clearCookie('vsf-saleor-token');
          }
        }
      })
    };
  }
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api,
  extensions: [tokenExtension]
});

export { createApiClient };
