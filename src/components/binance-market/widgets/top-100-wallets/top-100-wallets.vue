<template>
<div class="top-100-wallets rounded-borders-xl bg-dark q-px-md q-py-xs secondary-shadow-inset secondary-border">
  <div>
    <div class="f-w-800 text-uppercase q-mt-lg text-subtitle1 flex justify-between items-center">
      <span class="block">{{ $t('top100holders') }}</span>
      <q-btn
        icon="refresh"
        flat dense
        color="secondary"
        class="q-ml-sm"
        :disable="disableLoader"
        @click="reloadHodlers"
      />
    </div>
    <div class="flex items-center">
      <span class="q-mr-sm">{{ $t('top100holdersDescription') }}</span>
      <q-select
        :value="symbol"
        outlined
        dense
        emit-value
        map-options
        use-input
        :options="symbolOptions"
        @input="symbolOnInput"
        @filter="symbolsSearchFilterFn"
        class="q-mt-xs"
        style="width: 200px"
        popup-content-style="height: 300px"
      >
        <template v-slot:selected>
          <div v-if="symbol" class="flex items-center">
            <q-avatar size="25px" class="bg-transparent" square>
              <q-img
                v-if="symbol.logo"
                :src="symbol.logo"
                contain
                class="rounded-borders"
                img-class="white-shadow"
              >
                <template v-slot:loading>
                  <q-skeleton class="fit"/>
                </template>
              </q-img>
            </q-avatar>

            <div class="l-h-12 q-ml-xs">
              <div class="f-w-800 small-text">{{ slicedSymbol }}</div>
              <div class="small-text text-grey-5">{{ symbol.fullName }}</div>
            </div>
          </div>
        </template>

        <template v-slot:option="scope">

          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
            class="l-h-12 q-py-xs q-px-sm items-center"
          >
            <q-item-section class="q-pa-none" avatar style="min-width: 35px !important">
              <q-img
                v-if="scope.opt.logo"
                :src="scope.opt.logo"
                contain
                style="width: 25px; height: 25px"
                class="rounded-borders"
                img-class="white-shadow"
              >
                <template v-slot:loading>
                  <q-skeleton class="fit"/>
                </template>
              </q-img>
            </q-item-section>
            <q-item-section class="q-pa-none">
              <q-item-label class="small-text f-w-800 q-pa-none">{{ sliceSymbol(scope.opt) }}</q-item-label>
              <q-item-label class="small-text q-pa-none" caption>{{ scope.opt.fullName }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <div v-if="hodlers && hodlers.length">
      <!--      Header-->
      <div class="row q-mt-md items-center f-w-600 q-col-gutter-sm">
        <div class="col-2">
          № / %
        </div>
        <div class="col-3 text-left">
          Qty <span class="text-warning f-w-800">{{ slicedSymbol }}</span>
        </div>
        <div class="col-4 q-pl-sm">
          1 / 7 {{ $t('days') }}
        </div>
        <div class="col-3 text-center">
          {{ $t('address') }}
        </div>
      </div>

      <!--      Body-->
      <q-scroll-area style="height: 477px" class="q-pt-md" :thumb-style="thumbStyle" visible>
        <div
          v-for="hodler in hodlers"
          :key="hodler.rating"
          class="q-mt-xs"
        >
          <div class="row items-center q-col-gutter-sm">
            <!--          Рейтинг-->
            <div class="col-2">
              {{ hodler.rating }} / {{ hodler.percent.toFixed(2) }}%
            </div>

            <!--          Количество монет-->
            <div class="col-3 f-w-800 text-uppercase">
              {{ hodler.tokens | tokenQuantityFormatter }}
              <span class="f-w-600 block text-grey-5">{{ getUsdtSum(hodler.tokens) }}</span>
            </div>

            <!--          Изменеие за сутки-->
            <div class="col-4 f-w-800 q-pl-sm text-left text-uppercase l-h-12">
              <div v-if="hodler.oneDayChange" :class="hodler.oneDayChange > 0 ? 'text-positive' : 'text-negative'">
                {{ hodler.oneDayChange > 0 ? '+' : '' }}{{ hodler.oneDayChange | tokenQuantityFormatter }}
                <small class="f-w-600 small-text l-h-12">{{ getUsdtSum(hodler.oneDayChange) }}</small>
              </div>
              <div v-else>-</div>

              <!--            Изменение за неделю-->
              <div v-if="hodler.weeklyChange" :class="hodler.weeklyChange > 0 ? 'text-positive' : 'text-negative'">
                {{ hodler.weeklyChange > 0 ? '+' : '' }}{{ hodler.weeklyChange | tokenQuantityFormatter }}
                <small class="f-w-600 small-text l-h-12">
                  {{ getUsdtSum(hodler.weeklyChange) }}</small>
              </div>
              <div v-else>-</div>
            </div>
            <div class="col-3 f-w-300  text-center q-pl-md" style="cursor: pointer">
              <q-btn
                icon="content_copy"
                class=""
                flat size="sm"
                @click="copy(hodler.address)"
              >
                <q-tooltip>Copy address</q-tooltip>
              </q-btn>

            </div>
          </div>
          <q-separator class="q-mt-sm"/>
        </div>
      </q-scroll-area>

      <!--      Footer-->
      <q-separator class="q-mt-lg"/>
      <div>
        <div class="row q-my-md bg-dark q-pa-sm rounded-borders">
          <div class="col-12 col-sm-6">
            <div class="f-w-800 text-uppercase">{{ $t('totalPerDay') }}:
              <span
                class="text-uppercase"
                :class="dailySummary > 0 ? 'text-positive' : 'text-negative'">
              {{ dailySummary > 0 ? '+' : '' }}{{ dailySummary | tokenQuantityFormatter }}
              <small class="f-w-600 small-text l-h-12">{{ getUsdtSum(dailySummary) }}</small>
            </span>
            </div>
          </div>

          <div class="col-12 col-sm-6 ">
            <div class="f-w-800 text-uppercase">{{ $t('perWeek') }}:
              <span
                class="text-uppercase"
                :class="weeklySummary > 0 ? 'text-positive' : 'text-negative'">
              {{ weeklySummary > 0 ? '+' : '' }}{{ weeklySummary | tokenQuantityFormatter }}
              <small class="f-w-600 small-text l-h-12">{{ getUsdtSum(weeklySummary) }}</small>
            </span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div v-else class="text-h5 text-grey fit flex flex-center f-w-800 q-py-xl">
      <div>No data</div>
    </div>

  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { copyToClipboard } from 'quasar'
import notifier from 'src/utils/notifier'
import tokenQuantityFormatter from 'src/filters/token-quantity-formatter'

export default {
  name: 'top-100-wallets',
  filters: {
    tokenQuantityFormatter
  },
  computed: {
    ...mapState('info', ['hodlers']),
    ...mapState('binanceMarket', ['symbols']),
    dailySummary () {
      let sum = 0
      this.hodlers.forEach(item => {
        sum += item.oneDayChange
      })
      return sum
    },

    slicedSymbol () {
      return this.symbol ? this.symbol.symbol.replace('USDT', '') : ''
    },

    tickerSymbol () {
      return this.ticker.symbol?.replace('USDT', '') || ''
    },

    ticker () {
      return this.symbols.find(item => item.symbol.replace('USDT', '') === this.symbol?.symbol.replace('USDT', '')) || {}
    },

    weeklySummary () {
      let sum = 0
      this.hodlers.forEach(item => {
        sum += item.weeklyChange
      })
      return sum
    }
  },
  data () {
    return {
      symbol: this.symbols?.[0] || null,
      disableLoader: false,
      symbolOptions: [],
      thumbStyle: {
        right: '1px',
        borderRadius: '5px',
        width: '3px',
        opacity: 0.2
      }
    }
  },
  methods: {
    ...mapActions('info', ['loadHodlers']),
    sliceSymbol (symbol) {
      return symbol.symbol.replace('USDT', '')
    },
    symbolOnInput (val) {
      this.symbol = val
      this.setOptions()
    },
    copy (text) {
      copyToClipboard(text)
        .then(() => {
          notifier('Номер кошелька скопирован в буфер.')
        })
        .catch((e) => {
          notifier('Что-то пошло не так.' + e.message)
        })
    },
    symbolsSearchFilterFn (val, update, abort) {
      update(() => {
        this.symbolOptions = this.symbolOptions.filter(item => item.symbol.toLowerCase().includes(val.toLowerCase()) || item.fullName?.toLowerCase().includes(val.toLowerCase()))
      })
    },
    getUsdtSum (tokens) {
      return this.$numeral(parseFloat(tokens) * parseFloat(this.ticker.lastPrice)).format('($0.00a)').replace('(', '').replace(')', '')
    },
    async reloadHodlers () {
      this.disableLoader = true
      await this.loadHodlers(this.slicedSymbol)

      setTimeout(() => {
        this.disableLoader = false
      }, 10000)
    },
    async setOptions () {
      this.symbolOptions = [...this.symbols]
      if (!this.symbol && this.symbolOptions.length) this.symbol = this.symbolOptions[0]
    }
  },
  async created () {
    await this.loadHodlers(this.slicedSymbol)
    await this.setOptions()

    setInterval(() => {
      if (this.hodlers && !this.hodlers.length) {
        this.loadHodlers(this.slicedSymbol)
      }
    }, 5000)
  },
  watch: {
    symbols () {
      if (!this.symbolOptions.length) this.setOptions()
    },
    slicedSymbol (val) {
      this.loadHodlers(val)
    }
  }
}
</script>

<style lang="sass">
.ticker-detail-hodlers
  //background: $dark
  padding: 10px
</style>
