<template>
<div class="left-drawer-tabs relative-position" style="z-index: 9999">
  <q-tabs
    v-model="tab"
    active-color="white" active-bg-color="transparent"
    indicator-color="transparent" active-class="text-white-shadow"
    align="justify"
    class="q-py-xs text-grey-5"
    v-touch-swipe dense :shrink="true"
  >
    <q-tab name="menu">
      <template v-slot:default><q-icon name="home" size="16px"/></template>
    </q-tab>
    <q-tab name="spot" label="Спот" no-caps/>
    <q-tab name="futures" label="Фьючерсы" no-caps/>
    <q-tab name="wishlist">
      <template v-slot:default><q-icon name="star" size="16px"/></template>
    </q-tab>
  </q-tabs>

  <q-tab-panels v-model="tab" animated class="text-white" swipeable>
    <q-tab-panel name="menu" class="q-pa-none q-pt-sm">
      <left-drawer-content />
    </q-tab-panel>

    <q-tab-panel name="spot" class="q-pa-none q-pt-sm">
      <left-drawer-market />
    </q-tab-panel>

    <q-tab-panel name="futures" class="q-pa-none q-pt-sm">
      <left-drawer-market futures />
    </q-tab-panel>

    <q-tab-panel name="wishlist" class="q-pa-none q-pt-sm">
      <left-drawer-market wishlist-mode/>
    </q-tab-panel>
  </q-tab-panels>
</div>
</template>

<script>
import LeftDrawerContent from 'components/left-drawer/left-drawer-content'
import LeftDrawerMarket from 'components/left-drawer/left-drawer-market'
export default {
  name: 'left-drawer-tabs',
  components: { LeftDrawerMarket, LeftDrawerContent },
  data () {
    return {
      tab: 'menu'
    }
  },
  watch: {
    '$route.name' (val, oldVal) {
      if (val === 'market-ticker-detail' && oldVal !== 'market-ticker-detail' && this.tab === 'menu') {
        this.tab = 'spot'
      } else if (val === 'Binance-Market' && oldVal !== 'Binance-Market') this.tab = 'menu'
    }
  }
}
</script>

<style lang="sass">
.left-drawer-tabs
  .q-tab__label
    font-weight: 800

  .q-tab
    padding: 0 10px !important

  .q-tabs__content--align-justify .q-tab
    flex: none !important

  .q-tabs__content--align-justify
    display: grid
    grid-template-columns: 1fr 4fr 4fr 1fr
    width: 100%
</style>
