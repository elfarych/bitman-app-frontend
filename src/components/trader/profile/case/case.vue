<template>
<div class="case">
  <q-expansion-item
    header-class="text-subtitle2 f-w-800"
    group="case"
    class="bg-dark rounded-borders column"
    expand-icon="none"
    :default-opened="cases.length === 1"
  >
    <!--    Header-->
    <template v-slot:header>
      <div class="full-width relative-position">
        <div class="flex items-center justify-between full-width no-wrap">
          <div class="flex items-center no-wrap">
            <div>
              <q-icon name="business_center" size="30px"/>
            </div>
            <div class="q-ml-md">
              <div class="text-subtitle1 f-w-800 l-h-12">{{ traderCase.title }}</div>
              <div class="f-w-400 block l-h-12 q-mt-sm">{{ traderCase.text }}</div>
              <div>
                <small class="f-w-200 l-h-12 block q-mt-sm">Создан: {{
                    traderCase ? $dayjs(traderCase.date).format('DD.MM.YYYY') : ''
                  }}</small>
              </div>
            </div>
          </div>

          <case-actions :trader-case="traderCase"/>

        </div>

        <div v-if="traderCase.tokens.length">
          <q-separator />
          <div class="q-my-md">
            <case-totals :trader-case="traderCase"/>
          </div>

          <q-separator />
          <div class="text-subtitle1 q-mt-md">Активы <q-badge align="top" color="secondary">{{ traderCase.tokens.length }}</q-badge></div>
        </div>

      </div>

    </template>

    <div class="q-pa-md">
      <!--    Empty case-->
      <div v-if="!traderCase.tokens.length" class="">
        Портфель пуст.
      </div>

      <case-tokens :tokens="traderCase.tokens" :case-id="traderCase.id"/>
      <add-case-token :case-id="traderCase.id" :case-tokens="traderCase.tokens"/>

    </div>
  </q-expansion-item>

</div>
</template>

<script>
import { mapState } from 'vuex'
import getDifferencePercent from 'src/helpers/difference-precent'
import CaseActions from 'components/trader/profile/case/case-actions'
import AddCaseToken from 'components/trader/profile/case/add-case-token'
import CaseTokens from 'components/trader/profile/case/case-tokens'
import CaseTotals from 'components/trader/profile/case/case-totals'

export default {
  name: 'case',
  components: { CaseTotals, CaseTokens, AddCaseToken, CaseActions },
  props: {
    traderCase: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState('traderCase', ['cases']),
    ...mapState('binanceMarket', ['symbols']),
    percentProfit () {
      return this.getDifferencePercent(this.caseSum, this.caseCurrentSum)
    },
    percentProfitFormatted () {
      return this.percentProfit.toFixed(2)
    },
    caseProfit () {
      let profit = 0
      if (this.traderCase.tokens.length && this.symbols.length) {
        this.traderCase.tokens.forEach(item => {
          const itemInfo = this.symbols.find(s => s.symbol === item.symbol + 'USDT')
          const itemProfit = (parseFloat(itemInfo.lastPrice) * parseFloat(item.quantity_base_asset)) - (parseFloat(item.price) * parseFloat(item.quantity_base_asset))
          profit += itemProfit
        })
      }
      return profit
    },
    caseCurrentSum () {
      let sum = 0
      if (this.traderCase.tokens.length && this.symbols.length) {
        this.traderCase.tokens.forEach(item => {
          const itemInfo = this.symbols.find(s => s.symbol === item.symbol + 'USDT')
          const itemSum = parseFloat(itemInfo.lastPrice) * parseFloat(item.quantity_base_asset)
          sum += itemSum
        })
      }
      return sum
    },
    caseSum () {
      let sum = 0
      if (this.traderCase.tokens.length) {
        this.traderCase.tokens.forEach(item => {
          const itemSum = parseFloat(item.price) * parseFloat(item.quantity_base_asset)
          sum += itemSum
        })
      }

      return sum
    }
  },
  data () {
    return {
      addCoinLoading: false,
      addCoinForm: {}
    }
  },
  methods: {
    getDifferencePercent,
    priceFormatter (price) {
      return this.$numeral(price).format('(0,0.00)').replace('(', '-').replace(')', '')
    }
  }
}
</script>

<style lang="sass">
.case
  .rounded-borders
    overflow: hidden !important

  .q-item__section--side
    display: none !important
</style>
