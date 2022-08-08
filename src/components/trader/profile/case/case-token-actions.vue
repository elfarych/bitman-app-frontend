<template>
<div class="case-token-actions">
  <!--      Buttons-->
  <div class="q-mt-md flex justify-between">
    <div>
      <q-btn
        :label="showBuyCoinForm ? 'Cancel' : token.orders.length ? 'Buy' : 'Buy'"
        no-caps
        unelevated
        text-color="dark"
        :color="showBuyCoinForm ? 'negative' : 'positive'"
        size="sm"
        class="f-w-800"
        @click="buyCoinStart"
      />

      <q-btn
        v-if="token.orders.length"
        :label="showFixCoinForm ? 'Cancel' : 'Fix'"
        no-caps
        outline
        color="white"
        size="sm"
        class="q-ml-sm"
        @click="fixCoinStart"
      />
    </div>

    <div>
      <q-btn
        icon="search"
        flat
        padding="5px"
        size="sm"
        :to="{ name: 'market-ticker-detail', params: { symbol: token.symbol } }"
      />
      <q-btn
        icon="candlestick_chart"
        flat
        size="sm"
        padding="5px"
        class="q-ml-xs"
        title="Chart"
        @click="showChartPopup"
      />

      <q-btn
        icon="delete_forever"
        flat
        size="sm"
        padding="5px"
        class="q-ml-xs"
        @click="deleteDialog = true"
      />
    </div>
  </div>

  <!--      Buy token form-->
  <div v-if="showBuyCoinForm" class="q-mt-md">
    <div class="row items-center">
      <div class="col-4">
        <q-input
          type="number"
          v-model="buyCoinForm.quantity_base_asset"
          label="Coins qty"
          dense
        />
      </div>

      <div class="col-6 q-pl-xs">
        <q-input
          type="number"
          v-model="buyCoinForm.price"
          label="Price"
          dense
        >
          <template v-slot:prepend>
            <q-btn icon="refresh" flat dense size="sm" @click="updateFormPrice"/>
          </template>
        </q-input>
      </div>
      <div class="col-2 q-pl-xs text-center">
        <q-btn
          icon="add"
          color="positive"
          class=""
          dense
          :disable="buyCoinDisable"
          text-color="dark"
          :loading="buyCoinLoading"
          @click="buyCoin"
        />
      </div>

      <div class="col-6 offset-4 q-pl-xs">
        <small class="text-grey-5">Sum: {{ priceFormatter(addCoinSummary) }}</small>
      </div>
    </div>
  </div>

  <!--      Fix token form-->
  <div v-if="showFixCoinForm" class="q-mt-md">
    <div class="row">
      <div class="col-4">
        <q-input
          type="number"
          v-model="fixCoinForm.quantity_base_asset"
          label="Coins qty"
          dense
        />
        <q-btn label="max" dense flat size="sm" color="warning" @click="setMaxToFixQuantity"/>
      </div>

      <div class="col-6 q-pl-xs">
        <q-input
          type="number"
          v-model="fixCoinForm.price"
          label="Price"
          dense
        >
          <template v-slot:prepend>
            <q-btn icon="refresh" flat dense size="sm" @click="updateFormPrice"/>
          </template>
        </q-input>
        <small class="text-grey-5">Profit: {{ priceFormatter(fixCoinSummaryProfit) }}</small>
      </div>
      <div class="col-2 q-pl-xs text-center">
        <q-btn
          icon="done"
          color="positive"
          class=""
          dense
          text-color="dark"
          :loading="fixCoinLoading"
          :disable="fixCoinDisable"
          @click="fixCoin"
        />
      </div>
    </div>
  </div>

  <!--    Case delete dialog-->
  <q-dialog v-model="deleteDialog" persistent>
    <q-card style="width: 555px; max-width: 100%">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle1 f-w-600">Delete {{ token.symbol }}?</q-toolbar-title>
        <q-btn icon="close" dense flat v-close-popup/>
      </q-toolbar>

      <q-card-actions align="right">
        <q-btn
          icon="delete_forever"
          label="Delete"
          color="negative"
          no-caps
          unelevated
          outline
          :loading="deleteTokenLoading"
          @click="deleteToken"
        />

        <q-btn
          label="Cancel"
          no-caps
          unelevated
          flat
          class="q-ml-md"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import notifier from 'src/utils/notifier'

export default {
  name: 'case-token-actions',
  props: {
    token: {
      type: Object,
      default: () => {}
    },
    tokenMarketInfo: {
      type: Object,
      default: () => {}
    },
    caseId: Number,
    averageBuyPrice: Number,
    tokenCoinsCount: Number
  },
  data () {
    return {
      deleteDialog: false,
      deleteTokenLoading: false,
      showBuyCoinForm: false,
      showFixCoinForm: false,

      buyCoinLoading: false,
      fixCoinLoading: false,

      buyCoinForm: {
        quantity_base_asset: 1,
        price: null
      },
      fixCoinForm: {
        quantity_base_asset: 1,
        price: null
      }
    }
  },
  computed: {
    averageBuyPriceFormatted () {
      return this.averageBuyPrice.toFixed(this.floatLength)
    },
    floatLength () {
      return this.tokenMarketInfo.lastPrice.toString().split('.')[1]?.length || 0
    },
    addCoinSummary () {
      return (this.buyCoinForm.price * this.buyCoinForm.quantity_base_asset)
    },
    fixCoinSummaryProfit () {
      return ((this.fixCoinForm.price * this.fixCoinForm.quantity_base_asset) - (parseFloat(this.averageBuyPrice) * this.fixCoinForm.quantity_base_asset))
    },
    buyCoinDisable () {
      return this.buyCoinForm.price * this.buyCoinForm.quantity_base_asset <= 0
    },
    fixCoinDisable () {
      return this.fixCoinForm.price * this.fixCoinForm.quantity_base_asset <= 0
    }
  },
  methods: {
    ...mapActions('traderCase', ['createCaseTokenOrder', 'deleteCaseToken']),
    setMaxToFixQuantity () {
      this.fixCoinForm.quantity_base_asset = this.tokenCoinsCount
    },
    priceFormatter (price) {
      return this.$numeral(price).format('(0,0.0000) $').replace('(', '-').replace(')', '')
    },
    buyCoinStart () {
      this.showBuyCoinForm = !this.showBuyCoinForm
      this.showFixCoinForm = false
      this.buyCoinForm.price = this.tokenMarketInfo.lastPrice
    },

    fixCoinStart () {
      this.showFixCoinForm = !this.showFixCoinForm
      this.showBuyCoinForm = false
      this.fixCoinForm.price = this.tokenMarketInfo.lastPrice
    },

    updateFormPrice () {
      this.fixCoinForm.price = this.tokenMarketInfo.lastPrice
      this.buyCoinForm.price = this.tokenMarketInfo.lastPrice
    },

    async showChartPopup () {
      const vm = this
      await vm.$router.replace({
        query: {
          ...vm.$route.query,
          chart: vm.token.symbol
        }
      })
    },

    getCoinCreateData () {
      const data = {}
      data.token = this.token.id
      data.case = this.caseId
      data.logo = this.token.logo
      data.symbol = this.token.symbol

      return data
    },

    async buyCoin () {
      this.buyCoinLoading = true
      const data = this.getCoinCreateData()

      data.price = this.buyCoinForm.price
      data.quantity_base_asset = this.buyCoinForm.quantity_base_asset

      await this.createCaseTokenOrder({ data })

      this.showBuyCoinForm = false
      this.buyCoinForm = {
        quantity_base_asset: 1,
        price: null
      }
      this.buyCoinLoading = false
    },

    async fixCoin () {
      if (this.fixCoinForm.quantity_base_asset > this.tokenCoinsCount) {
        return notifier(`You can't sell more then ${this.tokenCoinsCount} coins.`)
      }
      this.fixCoinLoading = true
      const data = this.getCoinCreateData()

      data.price = this.fixCoinForm.price
      data.quantity_base_asset = this.fixCoinForm.quantity_base_asset
      data.profit = parseFloat(this.fixCoinSummaryProfit)
      data.fix_order = true

      await this.createCaseTokenOrder({ data })

      this.showFixCoinForm = false
      this.fixCoinForm = {
        quantity_base_asset: 1,
        price: null
      }

      this.fixCoinLoading = false
    },

    async deleteToken () {
      this.deleteTokenLoading = true
      await this.deleteCaseToken(this.token.id)
      this.deleteDialog = false
      this.deleteTokenLoading = true
    }
  },
  watch: {

  }
}
</script>

<style scoped>

</style>
