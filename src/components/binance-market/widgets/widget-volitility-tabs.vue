<template>
  <div class="widgets-big-liders q-px-sm">

    <q-tabs
      v-model="tab"
      active-color="primary"
      indicator-color="transparent" content-class="f-w-800"
      align="justify"
      v-touch-swipe
    >
      <q-tab name="up" label="Волатильность spot" class="f-w-800"/>
      <q-tab name="down" label="Futures"/>
    </q-tabs>

    <q-tab-panels v-model="tab" animated class="text-white bg-transparent" swipeable>
      <q-tab-panel name="up" class="q-pa-none q-pt-sm">
        <widget-liders />
      </q-tab-panel>

      <q-tab-panel name="down" class="q-pa-none q-pt-sm">
        <widget-liders :up="false"/>
      </q-tab-panel>

    </q-tab-panels>
  </div>
</template>

<script>
import WidgetLiders from 'components/binance-market/widgets/widget-liders'
export default {
  name: 'widget-volitility-tabs',
  components: { WidgetLiders },
  data () {
    return {
      tab: 'up'
    }
  }
}
</script>

<style lang="sass">
.widgets-big-liders
  .q-tab__label
    font-weight: 800
</style>
