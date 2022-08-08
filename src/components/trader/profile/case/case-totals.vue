<template>
<div class="case-totals">
  <div v-if="symbols.length" class="row f-w-400 q-col-gutter-md">
    <div class="case-totals-column column col-6 col-md-2 col-sm-4">
      <small class="text-grey-5">Circulation sum</small>
      <span class="f-w-800">{{ priceFormatter(caseSummaryCoast) }}</span>
    </div>

    <div class="case-totals-column column col-6 col-md-2 col-sm-4">
      <small class="text-grey-5">Current coast</small>
      <span class="f-w-800">{{ priceFormatter(caseCurrentSummaryPrice) }}</span>
    </div>

    <div class="case-totals-column column col-6 col-md-2 col-sm-4">
      <small class="text-grey-5">{{ caseCoastDifference > 0 ? 'Current profit' : 'Current loss' }}</small>
      <span class="f-w-800" :class="caseCoastDifference > 0 ? 'text-positive' : 'text-negative'" >{{ priceFormatter(caseCoastDifference) }}</span>
    </div>

    <div class="case-totals-column column col-6 col-md-2 col-sm-4">
      <small class="text-grey-5">Fixed {{ !caseTotalFixedProfitSummary || caseTotalFixedProfitSummary > 0 ? 'profit' : 'loss' }}</small>
      <span class="f-w-800" :class="!caseTotalFixedProfitSummary || caseTotalFixedProfitSummary > 0 ? 'text-positive' : 'text-negative'" >{{ priceFormatter(caseTotalFixedProfitSummary) }}</span>
    </div>

    <div class="case-totals-column column col-6 col-md-2 col-sm-4">
      <small class="text-grey-5">{{ caseSummaryInvestmentProfit > 0 ? 'Summary profit' : 'Summary loss' }}</small>
      <span class="f-w-800" :class="caseSummaryInvestmentProfit > 0 ? 'text-positive' : 'text-negative'" >{{ priceFormatter(caseSummaryInvestmentProfit) }}</span>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'case-totals',
  props: {
    traderCase: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState('binanceMarket', ['symbols']),
    caseSummaryCoast () {
      // Общая сумма в обороте
      let summaryCoast = 0
      this.traderCase.tokens.forEach(token => {
        const coinsCount = this.getCoinsCount(token)
        summaryCoast += coinsCount * this.getAverageBuyPrice(token)
      })
      return summaryCoast
    },

    caseCurrentSummaryPrice () {
      // Текушая стоимость портфеля
      let currentSummaryCoast = 0
      this.traderCase.tokens.forEach(token => {
        const coinsCount = this.getCoinsCount(token)
        currentSummaryCoast += this.getTokenMarketInfo(token).lastPrice * coinsCount
      })

      return currentSummaryCoast
    },

    caseCoastDifference () {
      // Текущий доход в $
      return this.caseCurrentSummaryPrice - this.caseSummaryCoast
    },

    caseTotalFixedProfitSummary () {
      // Зафиксированная прибыль
      let sum = 0
      this.traderCase.token_orders.forEach(item => {
        if (item.fix_order) sum += item.profit
      })

      return sum
    },
    caseSummaryInvestmentProfit () {
      // Суммарная прибыль
      return this.caseTotalFixedProfitSummary + this.caseCoastDifference
    }
  },
  methods: {
    getTokenMarketInfo (token) {
      return this.symbols.find(item => item.symbol === token.symbol + 'USDT')
    },
    getCoinsCount (token) {
      let coinsCount = 0
      token.orders.forEach(order => {
        if (order.fix_order) coinsCount -= order.quantity_base_asset
        else coinsCount += order.quantity_base_asset
      })
      return coinsCount
    },
    getAverageBuyPrice (token) {
      // Средняя цена покупки
      let quantity = 0
      let sum = 0
      token.orders.forEach(item => {
        if (!item.fix_order) {
          sum += item.price * item.quantity_base_asset
          quantity += item.quantity_base_asset
        }
      })

      return (sum / quantity).toFixed(this.getTokenPriceFloatLength(token)) || 0
    },
    getTokenPriceFloatLength (token) {
      // Количество дробных знаков
      if (token.orders.length) {
        return token.orders[0].price.toString().split('.')[1]?.length || 0
      } else return 0
    },
    priceFormatter (price) {
      return this.$numeral(price).format('(0,0.00) $').replace('(', '-').replace(')', '')
    }
  }
}
</script>

<style lang="sass">
.case-totals
  .case-totals-column
    line-height: 18px !important
</style>
