export const defaultSettings = {
  locale: 'en',
  acceptLanguage: ['en'],
  auth: {
    onTokenChange: (): void => {},
    onTokenRead: (): string => '',
    onTokenRemove: (): void => {}
  },
  cookies: {
    currencyCookieName: 'vsf-currency',
    countryCookieName: 'vsf-country',
    localeCookieName: 'vsf-locale'
  }
};
