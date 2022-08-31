<template>
<div class="arbitration-table-row">
  <div class="row q-col-gutter-md items-center">
    <div class="col-3 text-subtitle1 f-w-800" style="line-height: 1.1 !important">{{ symbol }}<br><small class="small-text f-w-400">USDT</small></div>
    <div class="col-6 flex">
      <div style="width: 150px">
        <div>
          <q-btn
            dense
            no-caps
            flat
            color="warning"
            :title="`Go to ${result.market1}`"
            type="a"
            target="_blank"
            class="text-subtitle1 f-w-800"
            :href="getMarketLink(result.market1)"
          >
            <div class="text-subtitle1 f-w-800">{{ result.market1 }}<q-icon name="open_in_new" size="15px" style="margin-top: -7px; margin-left: 5px"/></div>
          </q-btn>
        </div>
        <div class="ellipsis q-mt-xs">
          ${{ result.market1_price }}
          <q-tooltip>{{ result.market1_price }}</q-tooltip>
        </div>
      </div>

      <div class="" style="width: 150px">
        <div>
          <q-btn
            dense
            no-caps
            flat
            color="warning"
            :title="`Go to ${result.market2}`"
            type="a"
            target="_blank"
            class="text-subtitle1 f-w-800"
            :href="getMarketLink(result.market2)"
          >
            <div class="text-subtitle1 f-w-800">{{ result.market2 }}<q-icon name="open_in_new" size="15px" style="margin-top: -7px; margin-left: 5px"/></div>
          </q-btn>
        </div>
        <div class="ellipsis q-mt-xs">
          ${{ result.market2_price }}
          <q-tooltip>{{ result.market2_price }}</q-tooltip>
        </div>
      </div>
    </div>
    <div class="col-3 text-h6 f-w-800 text-secondary text-secondary-shadow">{{ result.difference }}%</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'arbitration-table-row',
  props: {
    result: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    symbol () {
      return this.result.symbol.replace('USDT', '')
    }
  },
  methods: {
    getMarketLink (market) {
      let link
      switch (market) {
        case 'Bybit':
          link = `https://www.bybit.com/trade/spot/${this.result.symbol.replace('USDT', '')}/USDT`
          break

        case 'Binance':
          link = `https://www.binance.com/en/trade/${this.result.symbol.replace('USDT', '')}_USDT?theme=dark&type=spot`
          break

        case 'Huobi':
          link = `https://www.huobi.com/exchange/${this.result.symbol.replace('USDT', '').toLowerCase()}_usdt`
          break

        case 'Pancake':
          link = 'https://pancakeswap.finance/swap'
          break

        case 'FTX':
          link = `https://ftx.com/trade/${this.result.symbol.replace('USDT', '')}/USD`
          break

        case 'Kucoin':
          link = `https://www.kucoin.com/ru/trade/${this.result.symbol.replace('USDT', '')}-USDT?spm=kcWeb.B1homepage.Header4.1`
          break

        case 'OKX':
          link = `https://www.okx.com/ru/trade-spot/${this.result.symbol.replace('USDT', '').toLowerCase()}-usdt`
          break

        case 'Gate':
          link = `https://www.gate.io/trade/${this.result.symbol.replace('USDT', '')}_USDT`
          break

        default:
          link = '#'
      }
      return link
    }
  }
}
</script>

<style lang="sass">
.arbitration-table-row
  border-radius: 8px
  padding: 10px
.arbitration-table-row:nth-child(2n + 1)
  background: $dark
</style>
