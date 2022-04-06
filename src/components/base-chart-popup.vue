<template>
<div class="base-chart-popup">
  <q-btn
    :label="showLabel ? 'Показать график' : ''"
    icon="bar_chart"
    class=" rounded-borders f-w-600"
    :class="showLabel ? 'q-pa-sm' : ''"
    color="secondary"
    :outline="showLabel"
    :flat="!showLabel"
    :dense="!showLabel"
    no-caps
    @click="showChartPopup"
  />

  <q-dialog v-model="dialog" maximized>
    <q-card>
      <q-toolbar class="q-px-sm">
        <q-toolbar-title class="f-w-800 text-primary">
          {{ chartSymbol }}/USDT
        </q-toolbar-title>
        <q-btn label="Закрыть" icon-right="close" outline @click="closeChartPopup" no-caps class="f-w-600 rounded-borders"/>
      </q-toolbar>

      <q-card-section id="popup-chart" style="height: 80%" class="q-px-sm">
        <VueTradingView :options="options" />
      </q-card-section>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
import VueTradingView from 'vue-trading-view'

export default {
  name: 'base-chart-popup',
  props: {
    showLabel: {
      type: Boolean,
      default: false
    },
    chartSymbol: String
  },
  components: {
    VueTradingView
  },
  computed: {
    symbol () {
      return this.$route.query.chart
    },
    options () {
      const vm = this
      return {
        autosize: true,
        height: 500,
        symbol: `BINANCE:${vm.chartSymbol}USDT`,
        interval: '60',
        timezone: 'exchange',
        theme: 'dark',
        style: '1',
        locale: 'ru',
        toolbar_bg: '#000000',
        enable_publishing: false,
        hide_side_toolbar: vm.$mobile,
        allow_symbol_change: false,
        show_popup_button: true,
        details: true,
        container_id: 'popup-chart'
      }
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    async showChartPopup () {
      await this.$router.replace({
        query: {
          ...this.$route.query,
          chart: this.chartSymbol
        }
      })
      this.dialog = true
    },
    async closeChartPopup () {
      await this.$router.replace({
        query: {
          ...this.$route.query,
          chart: undefined
        }
      })
      this.dialog = false
    }
  }
}
</script>

<style scoped>

</style>
