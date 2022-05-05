<template>
<div class="case-token">
  <q-card
    v-if="tokenMarketInfo"
    class="fit q-pa-sm transition-1 shadow-3"
    :class="tokenCoastDifference > 0 ? 'trader-case-list-item-token-positive-border' : tokenCoastDifference === 0 ? ''  : 'trader-case-list-item-token-negative-border'"
  >
    <div class="flex items-center">
      <div>
        <q-avatar :size="$mobile ? '30px' : '35px'" class="bg-transparent" square>
          <q-img
            v-if="token.logo"
            :src="token.logo"
            contain
            class="rounded-borders"
            img-class="white-shadow"
          >
            <template v-slot:loading>
              <q-skeleton class="fit"/>
            </template>
          </q-img>
        </q-avatar>
      </div>
      <div style="flex-grow: 1">
        <div class="f-w-800 q-ml-sm">{{ token.full_name }}</div>
        <div class="q-ml-sm flex justify-between items-center" style="flex-grow: 1; height: 20px">
          <div>
            {{ token.symbol }}
          </div>
          <div v-if="token.orders.length" class="text-subtitle2">
              <span :class="differencePercent > 0 ? 'text-positive' : 'text-negative'"
                    class="text-uppercase f-w-800 q-pl-sm"><span
                v-if="differencePercent > 0">+</span>{{ differencePercent.toFixed(2) }}%</span>
          </div>
          <div v-if="token.orders.length" class="text-subtitle2">
            <span :class="tokenCoastDifference > 0 ? 'text-positive' : 'text-negative'" class="text-uppercase f-w-800">{{ priceFormatter(tokenCoastDifference) }}</span>
          </div>
        </div>
      </div>
    </div>
    <q-tabs
      v-model="tab"
      active-color="primary"
      indicator-color="transparent"
      align="justify"
      v-touch-swipe dense no-caps
      class="q-mt-md q-mb-sm"
    >
      <q-tab name="info" label="Информация" class="rounded-borders" icon="analytics"/>
      <q-tab name="transactions" label="Транзакции" class="rounded-borders" icon="swap_horiz" ripple>
        <template v-slot:default>
          <q-badge class="absolute-top-right" color="transparent" style="font-size: 10px">{{ token.orders.length || '' }}</q-badge>
        </template>
      </q-tab>
    </q-tabs>

    <q-tab-panels  v-model="tab" animated class="text-white bg-transparent rounded-borders">

      <q-tab-panel name="info" class="q-pa-none">
        <!--      Token info-->
        <div class="q-mt-sm">
          <div><span class="trader-case-list-item-token-field-title">Средняя цена покупки:</span>{{ tokenAverageBuyPrice || '' }} <span v-if="tokenAverageBuyPrice">$</span></div>
          <div><span class="trader-case-list-item-token-field-title">Текущая цена:</span>{{ tokenMarketInfo.lastPrice }} $</div>
          <div><span class="trader-case-list-item-token-field-title">Количество монет:</span>{{ tokenCoinsSummary }}</div>
          <div><span class="trader-case-list-item-token-field-title">Сумма в обороте:</span> <span class="text-uppercase">{{ priceFormatter(tokenSummaryCoast) }}</span></div>
          <div><span class="trader-case-list-item-token-field-title">Текущая стоимость:</span> <span class="text-uppercase">{{ priceFormatter(tokenCurrentSummaryPrice) }}</span></div>
          <div><span class="trader-case-list-item-token-field-title">{{ tokenCoastDifference > 0 ? 'Текущая доходность' : 'Текущий убыток' }}:</span> <span :class="tokenCoastDifference > 0 ? 'text-positive' : 'text-negative'"  class="text-uppercase">{{ priceFormatter(tokenCoastDifference) }}</span></div>
          <q-separator class="q-mt-sm"/>
          <div><span class="trader-case-list-item-token-field-title q-mt-sm">Фикс. {{ tokenTotalFixedProfitSummary >= 0 ? 'прибыль' : 'убыток' }}:</span> <span :class="tokenTotalFixedProfitSummary >= 0 ? 'text-positive' : 'text-negative'" class="text-uppercase">{{ priceFormatter(tokenTotalFixedProfitSummary) }}</span></div>
          <div><span class="trader-case-list-item-token-field-title">{{ tokenSummaryInvestmentProfit >= 0 ? 'Сумарная прибыль' : 'Сумарный убыток' }}:</span> <span :class="tokenSummaryInvestmentProfit >= 0 ? 'text-positive' : 'text-negative'" class="text-uppercase">{{ priceFormatter(tokenSummaryInvestmentProfit) }}</span></div>

        </div>
      </q-tab-panel>

      <q-tab-panel name="transactions" class="q-pa-none">
        <!--      Token transactions-->
        <case-token-transactions :orders="token.orders"/>
      </q-tab-panel>

    </q-tab-panels>

<!--    Token actions-->
    <case-token-actions
      :token="token"
      :token-market-info="tokenMarketInfo"
      :case-id="caseId"
      :average-buy-price="Number(tokenAverageBuyPrice)"
      :token-coins-count="tokenCoinsSummary"
      class="q-mt-lg"
    />
  </q-card>
</div>
</template>

<script>
import { mapState } from 'vuex'
import getDifferencePercent from 'src/helpers/difference-precent'
import CaseTokenActions from 'components/trader/profile/case/case-token-actions'
import CaseTokenTransactions from 'components/trader/profile/case/case-token-transactions'

export default {
  name: 'case-token',
  components: { CaseTokenTransactions, CaseTokenActions },
  props: {
    caseId: Number,
    token: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      tab: 'info'
    }
  },
  computed: {
    ...mapState('binanceMarket', ['symbols']),
    tokenMarketInfo () {
      return this.symbols.find(item => item.symbol === this.token.symbol + 'USDT')
    },
    tokenCurrentSummaryPrice () {
      // Текушая стоимость токенов
      return this.tokenMarketInfo.lastPrice * this.tokenCoinsSummary
    },
    tokenActiveOrders () {
      // Транзакции на покупку
      return this.token.orders.filter(item => !item.fix_order)
    },
    tokenAverageBuyPrice () {
      // Средняя цена покупки
      let quantity = 0
      let sum = 0
      this.token.orders.forEach(item => {
        if (!item.fix_order) {
          sum += item.price * item.quantity_base_asset
          quantity += item.quantity_base_asset
        }
      })

      return (sum / quantity).toFixed(this.floatLength) || 0
    },
    tokenSummaryCoast () {
      // Общая сумма в обороте
      return this.tokenCoinsSummary * this.tokenAverageBuyPrice
    },
    tokenCoinsSummary () {
      // Всего монет
      let sum = 0
      this.token.orders.forEach(item => {
        if (item.fix_order) sum -= item.quantity_base_asset
        else sum += item.quantity_base_asset
      })

      return sum
    },

    tokenSummaryInvestmentProfit () {
      // Суммарная прибыль
      return this.tokenTotalFixedProfitSummary + this.tokenCoastDifference
    },

    tokenTotalFixedProfitSummary () {
      // Зафиксированная прибыль
      let sum = 0
      this.token.orders.forEach(item => {
        if (item.fix_order) sum += item.profit
      })

      return sum
    },
    differencePercent () {
      // Текущий доход в %
      return getDifferencePercent(this.tokenAverageBuyPrice, this.tokenMarketInfo.lastPrice) || 0
    },
    tokenCoastDifference () {
      // Текущий доход в $
      return this.tokenCurrentSummaryPrice - this.tokenSummaryCoast
    },
    floatLength () {
      // Количество дробных знаков
      if (this.token.orders.length) {
        return this.token.orders[0].price.toString().split('.')[1]?.length || 0
      } else return 0
    }
  },
  methods: {
    priceFormatter (price) {
      return this.$numeral(price).format('(0,0.00) $').replace('(', '-').replace(')', '')
    }
  }
}
</script>

<style lang="sass">
.case-token
  .q-tab__label
    font-weight: 600 !important
    font-size: 13px
  .trader-case-list-item-token-field-title
    color: $grey-5
    width: 160px
    display: inline-block

  .trader-case-list-item-token-positive-border
    background: rgb(30, 34, 45)
    background: linear-gradient(153deg, rgba(30, 34, 45, 0) 72%, rgba(24, 188, 131, 0.3) 100%)

  .trader-case-list-item-token-negative-border
    background: rgb(30, 34, 45)
    background: linear-gradient(153deg, rgba(30, 34, 45, 0) 72%, rgba(244, 66, 83, 0.3) 100%)
</style>
