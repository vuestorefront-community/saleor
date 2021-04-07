import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-fetch';

import { asyncMap } from '@apollo/client/utilities';
import { Logger } from '@vue-storefront/core';
import { onError } from 'apollo-link-error';

import { handleAfterAuth } from './linkHandlers';
import { Config } from '../../types/setup';

const createErrorHandler = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        if (!message.includes('Resource Owner Password Credentials Grant')) {
          if (!locations) {
            Logger.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);
            return;
          }

          const parsedLocations = locations.map(
            ({ column, line }) => `[column: ${column}, line: ${line}]`
          );

          Logger.error(
            `[GraphQL error]: Message: ${message}, Location: ${parsedLocations.join(
              ', '
            )}, Path: ${path}`
          );
        }
      });
    }

    if (networkError) {
      Logger.error(`[Network error]: ${networkError}`);
    }
  });
};

const createSaleorConnection = (settings: Config): any => {
  const jwtToken: any = settings.auth.onTokenRead();
  Logger.debug('createSaleorConnection', jwtToken);

  const httpLink = createHttpLink({ uri: settings.api.uri, fetch });
  const onErrorLink = createErrorHandler();

  const authLinkBefore = setContext(async (apolloReq, { headers }) => {
    Logger.debug('Apollo authLinkBefore', apolloReq.operationName as any);

    if (jwtToken) {
      headers = {
        ...headers,
        authorization: `JWT ${jwtToken}`
      };
    }

    return {
      headers
    };
  });

  const authLinkAfter = new ApolloLink((apolloReq, forward): any => {
    return asyncMap(forward(apolloReq) as any, async (response: any) => {
      Logger.debug('Apollo authLinkAfter', apolloReq.operationName as any);

      const auth = settings.auth;

      await handleAfterAuth({ auth, apolloReq, response });

      const errors = (response.errors || []).filter(
        ({ message }) =>
          !message.includes('Resource Owner Password Credentials Grant') &&
          !message.includes(
            'This endpoint requires an access token issued either'
          )
      );

      return { ...response, errors };
    });
  });

  const apolloLink = ApolloLink.from([
    onErrorLink,
    authLinkBefore,
    authLinkAfter.concat(httpLink)
  ]);

  return {
    apolloLink
  };
};

export { createSaleorConnection };
