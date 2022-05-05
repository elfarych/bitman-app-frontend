<template>
<div class="add-case-token">
  <q-btn
    label="Добавить монету"
    icon="add"
    color="secondary"
    no-caps
    unelevated
    class="q-mt-lg"
    @click="addCoinStart"
  />
  <q-dialog v-model="dialog">
    <q-card style="width: 555px; max-width: 100%">
      <q-toolbar>
        <q-space />
        <q-btn icon="close" dense flat v-close-popup/>
      </q-toolbar>

      <q-card-section>

        <!--        Token-->
        <q-select
          v-model="coinForm.symbol"
          :options="options"
          :label="selectedCoin ? 'Монета' : 'Выберите монету'"
          use-input
          dense
          outlined
          popup-content-style="height: 300px"
          @filter="coinsFilter"
        >
          <template v-slot:selected>
            <div class="flex items-center q-py-xs">
              <q-avatar v-if="selectedCoin" :size="$mobile ? '15px' : '25px'" class="bg-transparent" square>
                <q-img
                  v-if="selectedCoin && selectedCoin.logo"
                  :src="selectedCoin.logo"
                  contain
                  class="rounded-borders"
                  img-class="white-shadow"
                >
                  <template v-slot:loading>
                    <q-skeleton class="fit"/>
                  </template>
                </q-img>
              </q-avatar>
              <div class="cursor-pointer text-white text-subtitle1 f-w-800 q-ml-sm text-white-shadow-light" style="line-height: 0">
                {{ selectedSymbol }}
              </div>
            </div>
          </template>
        </q-select>

        <!--        Price-->
        <q-input
          type="number"
          v-model="coinForm.price"
          :disable="!coinForm.symbol"
          label="Цена покупки $"
          outlined
          dense
          class="q-mt-md"
        >
          <template v-slot:append>
            <q-btn
              icon="refresh"
              flat dense
              @click="updateSelectedPrice"
            />
          </template>
        </q-input>

        <!--        Quantity-->
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <q-input
              type="number"
              v-model="coinForm.quantity_base_asset"
              :disable="!coinForm.price || coinForm.price < 0"
              :label="selectedSymbol ? `Количество ${selectedSymbol}` : 'Количество монет'"
              outlined
              dense
              class="q-mt-md"
            />
          </div>
          <div class="col-6">
            <q-input
              v-model="computedSumInUsd"
              disable
              label="Сумма $" borderless
              dense
              class="q-mt-md"
            />
          </div>
        </div>

        <!--        Add button-->
        <q-btn
          :disable="computedSumInUsd === '0.00' || computedSumInUsd.startsWith('-')"
          label="Добавить монету"
          class="q-mt-lg q-py-sm text-white-shadow f-w-800 full-width"
          no-caps
          unelevated
          :loading="addCoinLoading"
          color="secondary"
          @click="addCoin"
        />

      </q-card-section>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
import config from 'src/config'
import errorHandler from 'src/utils/error-handler'

export default {
  name: 'add-case-token',
  props: {
    caseId: Number,
    caseTokens: []
  },
  computed: {
    ...mapState('binanceMarket', ['symbols']),
    selectedSymbol () {
      return this.coinForm.symbol
    },
    selectedCoin () {
      return this.symbols.find(item => item.symbol === this.coinForm.symbol + 'USDT')
    },
    caseTokensSymbols () {
      return this.caseTokens.map(item => item.symbol)
    },
    coinOptions () {
      return this.symbols
        .map(item => item.symbol.replace('USDT', ''))
        .filter(item => !this.caseTokensSymbols.includes(item))
    },
    computedSumInUsd: {
      get: function () {
        return (parseFloat(this.coinForm.price) * parseFloat(this.coinForm.quantity_base_asset) || 0).toFixed(2)
      },
      set: function (val) {
        this.quantityInUsd = val
      }
    }
  },
  data () {
    return {
      dialog: false,
      quantityInUsd: 0,
      addCoinLoading: false,
      options: [],
      coinForm: {
        symbol: '',
        price: null,
        quantity_base_asset: null
      }
    }
  },
  methods: {
    ...mapActions('traderCase', ['createCaseToken']),

    addCoinStart () {
      this.options = this.coinOptions
      this.dialog = true
    },

    coinsFilter (val, update, abort) {
      update(() => {
        this.options = this.coinOptions.filter(item => item.toLowerCase().includes(val.toLowerCase()))
      })
    },

    updateSelectedPrice () {
      this.coinForm.price = this.selectedCoin.lastPrice
    },

    async addCoin () {
      const vm = this
      vm.addCoinLoading = true
      const fullInfo = await vm.loadTickerDetailInfo()
      const data = {
        symbol: vm.coinForm.symbol,
        price: Math.abs(parseFloat(vm.coinForm.price)),
        quantity_base_asset: Math.abs(parseFloat(vm.coinForm.quantity_base_asset)),
        case: vm.caseId,
        full_name: fullInfo.name,
        logo: fullInfo.logo
      }

      await vm.createCaseToken({ data })

      vm.dialog = false
      vm.coinForm = {
        symbol: '',
        price: null,
        quantity_base_asset: null
      }
      vm.addCoinLoading = false
    },

    async loadTickerDetailInfo () {
      const vm = this
      let tokenInfo
      try {
        await axios
          .get(`${config.nodeServerURI}/info/coin-market-cap`, {
            params: {
              symbol: vm.coinForm.symbol
            }
          })
          .then(res => {
            tokenInfo = res.data.data
          })
      } catch (e) {
        errorHandler(e)
      }

      return tokenInfo
    }
  },
  watch: {
    selectedSymbol  (val) {
      if (val) {
        this.coinForm.price = this.selectedCoin.lastPrice
      }
    }
  }
}
</script>

<style scoped>

</style>
