<template>
<div :class="showCount > 14 ? 'widgets-big-liders' : ''" class="widgets-big-liders-tabs">

  <q-tabs
    v-model="tab"
    active-color="secondary"
    active-class="secondary-shadow-inset rounded-borders-xl"
    indicator-color="transparent"
    align="justify"
    class="rounded-borders-xl"
    v-touch-swipe
  >
    <q-tab name="spot" label="Спот" class="rounded-borders" />
    <q-tab name="futures" label="Фьючерсы" class="rounded-borders"/>
  </q-tabs>

  <q-tab-panels  v-model="tab" animated class="text-white bg-transparent rounded-borders">
    <q-tab-panel name="spot" class="q-pa-none">
      <widget-liders :up="up" tabKey="spot" :show-count="showCount"/>
    </q-tab-panel>

    <q-tab-panel name="futures" class="q-pa-none">
      <widget-liders futures :up="up" tabKey="futures" :show-count="showCount"/>
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
    },
    showCount: {
      type: Number,
      default: 15
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

.widgets-big-liders-tabs
  .q-tab__label
    font-weight: 900
    text-transform: capitalize
</style>
