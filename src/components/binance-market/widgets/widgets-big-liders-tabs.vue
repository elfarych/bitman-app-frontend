<template>
<div class="widgets-big-liders">

  <q-tabs
    v-model="tab"
    active-color="primary"
    indicator-color="transparent"
    align="justify"
    v-touch-swipe
  >
    <q-tab name="spot" label="Spot" class="rounded-borders" />
    <q-tab name="futures" label="Futures" class="rounded-borders"/>
  </q-tabs>

  <q-tab-panels  v-model="tab" animated class="text-white bg-transparent rounded-borders">
    <q-tab-panel name="spot" class="q-pa-none">
      <widget-liders :up="up" tabKey="spot"/>
    </q-tab-panel>

    <q-tab-panel name="futures" class="q-pa-none">
      <widget-liders futures :up="up" tabKey="futures"/>
    </q-tab-panel>

  </q-tab-panels>
</div>
</template>

<script>
import WidgetLiders from 'components/binance-market/widgets/widget-liders'
export default {
  name: 'widgets-big-liders-tabs',
  components: { WidgetLiders },
  props: {
    up: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tab: 'spot'
    }
  }
}
</script>

<style lang="sass">
.widgets-big-liders
  min-height: 800px

  .q-tab__label
    font-weight: 800
</style>
