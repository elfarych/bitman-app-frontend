<template>
<div class="trader-profile-tabs">
  <q-tabs
    v-model="tab"
    active-color="primary"
    indicator-color="transparent"
    align="justify"
    v-touch-swipe dense no-caps
  >
    <q-tab name="case" label="Портфель" class="rounded-borders" icon="business_center"/>
    <q-tab name="forecasts" label="Прогнозы" class="rounded-borders" icon="tips_and_updates"/>
    <q-tab name="refs" label="Рефералы" class="rounded-borders" icon="tips_and_updates"/>
  </q-tabs>

  <q-tab-panels  v-model="tab" animated class="text-white bg-transparent rounded-borders">
    <q-tab-panel name="case" class="q-pa-none">
      <trader-case />
    </q-tab-panel>

    <q-tab-panel name="refs" class="q-pa-none">

    </q-tab-panel>

  </q-tab-panels>
</div>
</template>

<script>
import TraderCase from 'components/trader/profile/trader-case/trader-case'
export default {
  name: 'trader-profile-tabs',
  components: { TraderCase },
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
