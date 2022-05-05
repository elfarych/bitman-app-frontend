<template>
<div class="trader-profile-tabs">
  <q-tabs
    v-model="tab"
    active-color="primary"
    indicator-color="transparent"
    align="justify"
    v-touch-swipe dense no-caps
  >
    <q-tab name="case" label="Портфель" class="rounded-borders"/>
    <q-tab name="wishlist" label="Избранное" class="rounded-borders"/>
    <q-tab name="settings" label="Настройки" class="rounded-borders"/>
  </q-tabs>

  <q-tab-panels  v-model="tab" animated class="text-white bg-transparent rounded-borders">
    <q-tab-panel name="case" class="q-pa-none">
      <case-page />
    </q-tab-panel>

    <q-tab-panel name="wishlist" class="q-pa-none">
      <trader-wishlist class="q-mt-lg"/>
    </q-tab-panel>

    <q-tab-panel name="settings">
      <div class="q-py-xl bg-dark flex flex-center rounded-borders">
        <div class="text-subtitle1 f-w-800 text-center">
          <q-icon name="code" size="50px" color="warning"/>
          <div>
            Данный раздел в разработке
          </div>
        </div>
      </div>
    </q-tab-panel>

  </q-tab-panels>
</div>
</template>

<script>
import CasePage from 'components/trader/profile/case/case-page'
import TraderWishlist from 'components/trader/profile/wishlist/trader-wishlist'
export default {
  name: 'trader-profile-tabs',
  components: { TraderWishlist, CasePage },
  data () {
    return {
      tab: 'case'
    }
  }
}
</script>

<style lang="sass">
.trader-profile-tabs
  .q-tab__label
    font-weight: 900
</style>
