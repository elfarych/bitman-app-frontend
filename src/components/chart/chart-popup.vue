<template>
<div class="chart-popup">
  <div v-if="showChart" class="chart-popup-wrapper">
    <q-card>
      <q-toolbar class="q-px-sm">
        <q-toolbar-title class="f-w-800">
          {{ symbol }}
        </q-toolbar-title>
        <q-btn label="Закрыть" icon-right="close" @click="closeChartPopup" no-caps flat dense class="f-w-600 rounded-borders"/>
      </q-toolbar>

      <q-card-section id="popup-chart" style="height: calc(100vh - 50px)" class="q-px-sm q-pt-none">
        <VueTradingView :options="options" :key="$route.query.chart" />
      </q-card-section>
    </q-card>
  </div>
</div>
</template>

<script>
import VueTradingView from 'vue-trading-view'

export default {
  name: 'chart-popup',
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
        symbol: `BINANCE:${vm.symbol}USDT`,
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
      showChart: false
    }
  },
  methods: {
    async closeChartPopup () {
      await this.$router.replace({
        query: {
          ...this.$route.query,
          chart: undefined
        }
      })
      this.showChart = false
    }
  },
  watch: {
    symbol (val) {
      if (val) {
        this.showChart = true
      }
    }
  },
  created () {
    if (this.symbol) {
      this.showChart = true
    }
  }
}
</script>

<style lang="sass">
.chart-popup-wrapper
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 9999
  background: $dark
</style>
