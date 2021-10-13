<div align="center">
  <img src="https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png" alt="Vue Storefront" height="80px" />
</div>

# Boilerplate for Vue Storefront Next

<a href="https://slack.vuestorefront.io">![Branch Develop](https://img.shields.io/badge/community%20chat-slack-FF1493.svg)</a>

> **Disclaimer:** This project is still in beta phase.

This repository is a starting point for creating new integrations for [Vue Storefront Next](https://github.com/DivanteLtd/vue-storefront/tree/next).

* [Documentation](https://docs-next.vuestorefront.io/integrate/ecommerce.html#scope) (WIP)


This repository is a monorepo containing three projects:

* **api-client** - communicates with a backend;
* **composables** - exposes composable functions used to retrieve data using `api-client` and to map them to universal data formats using `getters`;
* **theme** - `nuxt` project that glues everything together. It extends our core theme and uses `composables` to retrieve data.

## How to start?

1. Change all `@vue-storefront/saleor` strings to your integration name (eg `@vue-storefront/super-ecomm`)

2. Install all required dependencies:

```sh
yarn install
```

3. (optional) Then you can verify if everything works properly by building all three projects:

```sh
yarn build
```

4. If everything built properly, you can start creating your new integration with:

```sh
yarn dev
```
