<template>
<div class="ticker-detail-chart" id="tr-chart">
  <VueTradingView :options="options" :key="$route.params.symbol"/>
</div>
</template>

<script>

import VueTradingView from 'vue-trading-view'

export default {
  name: 'ticker-detail-chart',
  components: {
    VueTradingView
  },
  methods: {

  },
  computed: {
    options () {
      const vm = this
      const options = {
        autosize: true,
        symbol: `BINANCE:${vm.$route.params.symbol}USDT`,
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
        // studies: [
        //   'MACD@tv-basicstudies',
        //   'RSI@tv-basicstudies'
        // ],
        container_id: 'tr-chart'
      }

      return options
    }
  }
}
</script>

<style lang="sass">
.ticker-detail-chart
  width: 100%
  height: 500px
  //border-radius: 15px
  padding: 5px

</style>
