module.exports = {
  integrations: {
    saleor: {
      location: '@vue-storefront/saleor-api/server',
      configuration: {
        api: {
          uri: 'https://demo.saleor.io/graphql/'
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};
