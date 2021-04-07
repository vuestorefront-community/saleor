import { Logger } from '@vue-storefront/core';
import { isUserOperation } from './restrictedOperations';
import { Context } from '@apollo/client';

export const handleBeforeAuth = async (): Promise<void> => {};

export const handleAfterAuth = async ({ auth, apolloReq, response }: Context): Promise<string> => {
  if (isUserOperation(apolloReq.operationName)) {
    Logger.debug(
      'Apollo authLinkAfter, customerPasswordFlow',
      apolloReq.operationName
    );

    const jwtToken = response.data.tokenCreate.token;

    auth.onTokenChange(jwtToken);

    Logger.debug(
      'Apollo authLinkAfter, customerPasswordFlow, generated token: ',
      jwtToken
    );

    return jwtToken;
  }

  return null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars

