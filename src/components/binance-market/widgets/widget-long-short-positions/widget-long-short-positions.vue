<template>
  <div class="widget-btc-long-short-positions q-pb-lg">

    <div class="f-w-800 text-subtitle1 text-uppercase">
      Настроения рынка
    </div>

    <div class="flex justify-between items-center">
      <div class="small-text">
        по данным топовых бирж
      </div>
      <div class="q-pr-md q-mt-sm flex justify-end">
        <q-btn
          label="24h"
          dense flat
          class="f-w-800"
          size="sm"
          :disable="disableIntervalBtn"
          :color="interval === '24h' ? 'secondary' : ''"
          @click="interval = '24h'"
        />

        <q-btn
          label="1h"
          dense flat
          size="sm"
          class="f-w-800 q-ml-xs"
          :disable="disableIntervalBtn"
          :color="interval === '1h' ? 'secondary' : ''"
          @click="interval = '1h'"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-4">
        <widget-long-short-positions-diagram :token="btc" :diagram-height="diagramHeight"/>
      </div>
      <div class="col-4">
        <widget-long-short-positions-diagram :token="eth" :diagram-height="diagramHeight"/>
      </div>
      <div class="col-4">
        <widget-long-short-positions-diagram :token="bnb" :diagram-height="diagramHeight"/>
      </div>
    </div>
    <q-separator class="q-mb-sm"/>
    <div class="row q-col-gutter-xl f-w-800">
      <div class="col-4 text-center">
        Bitcoin
      </div>
      <div class="col-4 text-center">
        Ethereum
      </div>
      <div class="col-4 text-center">
        BNB
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import errorHandler from 'src/utils/error-handler'
import WidgetLongShortPositionsDiagram
from 'components/binance-market/widgets/widget-long-short-positions/widget-long-short-positions-diagram'

export default {
  name: 'widget-long-short-positions',
  components: { WidgetLongShortPositionsDiagram },
  props: {
    diagramHeight: Number
  },
  data () {
    return {
      interval: '24h',
      btc: { longs: '', shorts: '' },
      eth: { longs: '', shorts: '' },
      bnb: { longs: '', shorts: '' },
      disableIntervalBtn: false
    }
  },
  methods: {
    async loadPositions () {
      const vm = this

      try {
        await axios
          .get(`https://api.gatebigdata.com/v3/data/ls/all/coin_type/all/ts/${vm.interval}?url=fetchLsListAll`)
          .then(res => {
            const btcData = res.data.data.btc || []
            const ethData = res.data.data.eth || []
            const bnbData = res.data.data.bnb || []

            vm.btc.longs = btcData[1]?.data[0] || 0
            vm.btc.shorts = btcData[2]?.data[0] || 0
            vm.eth.longs = ethData[1]?.data[0] || 0
            vm.eth.shorts = ethData[2]?.data[0] || 0
            vm.bnb.longs = bnbData[1]?.data[0] || 0
            vm.bnb.shorts = bnbData[2]?.data[0] || 0
          })
      } catch (e) {
        errorHandler(e)
      }
    }
  },
  created () {
    this.loadPositions()
  },
  watch: {
    interval () {
      this.loadPositions()
      this.disableIntervalBtn = true

      setTimeout(() => {
        this.disableIntervalBtn = false
      }, 3000)
    }
  }
}

</script>

<style scoped>

</style>
