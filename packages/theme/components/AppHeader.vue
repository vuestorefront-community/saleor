<template>
  <SfHeader
    data-cy="app-header"
    @enter:search="changeSearchTerm"
    @change:search="p => term = p"
    :searchValue="term"
    class="sf-header--has-mobile-search"
  >
    <!-- TODO: add mobile view buttons after SFUI team PR -->
    <template #logo>
      <nuxt-link data-cy="app-header-url_logo" :to="localePath('/')" class="sf-header__logo">
        <SfImage src="/icons/logo.svg" alt="Vue Storefront Next" class="sf-header__logo-image"/>
      </nuxt-link>
    </template>
    <template #navigation>
      <SfHeaderNavigationItem class="nav-item" data-cy="app-header-url_accessories" label="Accessories" :link="localePath('/c/accessories')" />
      <SfHeaderNavigationItem class="nav-item" data-cy="app-header-url_apparel" label="Groceries" :link="localePath('/c/groceries')" />
      <SfHeaderNavigationItem class="nav-item" data-cy="app-header-url_groceries" label="Apparel" :link="localePath('/c/apparel')" />

    </template>
    <template #aside>
      <LocaleSelector class="smartphone-only" />
    </template>
    <template #header-icons>
      <div class="sf-header__icons">
        <SfButton
          class="sf-button--pure sf-header__action"
          data-cy="app-header-account"
          @click="handleAccountClick"
        >
          <SfIcon
            class="sf-header__icon"
            :icon="accountIcon"
            size="1.25rem"
          />
        </SfButton>

        <SfButton
          class="sf-button--pure sf-header__action"
          data-cy="app-header-toggle-cart"
          @click="toggleCartSidebar"
        >
          <SfIcon
            class="sf-header__icon"
            icon="empty_cart"
            size="1.25rem"
          />
          <SfBadge v-if="cartTotalItems" class="sf-badge--number cart-badge">{{cartTotalItems}}</SfBadge>
        </SfButton>
      </div>
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader, SfImage, SfIcon, SfButton, SfBadge } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import useUiHelpers from '../composables/useUiHelpers';
import { computed, ref } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useCart, useUser, cartGetters } from '@vue-storefront/saleor';
import LocaleSelector from './LocaleSelector';
export default {
  components: {
    SfHeader,
    SfImage,
    LocaleSelector,
    SfIcon,
    SfButton,
    SfBadge
  },
  setup(props, { root }) {
    const { toggleCartSidebar, toggleLoginModal } = useUiState();
    const { changeSearchTerm, getFacetsFromURL } = useUiHelpers();

    const { isAuthenticated, load: loadUser } = useUser();
    const { cart, load: loadCart } = useCart();

    const term = ref(getFacetsFromURL().term);

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() => isAuthenticated.value ? 'profile_fill' : 'profile');

    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = async () => {

      if (isAuthenticated.value) {

        await root.$router.push('/my-account');
        return;
      }

      toggleLoginModal();
    };

    onSSR(async () => {
      await loadUser();
      await loadCart();
    });

    return {
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      changeSearchTerm,
      term
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header {
  --header-padding:  var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
  }
  &__logo-image {
      height: 100%;
  }
}
.header-on-top {
  z-index: 2;
}
.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);
}

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
</style>
