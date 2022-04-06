<template>
<div class="binance-orders">
  <div class="row items-center">
    <div class="col-6 col-sm-4 q-pb-sm">
      <base-page-title screener-name="Рынок" screener-link="https://accounts.binance.com/ru/register?ref=368026154" screener-text="" :real-time-text="false"/>
    </div>
    <div class="col-sm-4 col-6 q-pb-sm binance-market-switcher">
      <q-btn
        label="Spot"
        dense flat
        :color="market === 'Spot' ? 'primary' : ''"
        class="f-w-800 transition-1"
        @click="market = 'Spot'"
      />

      <q-btn
        label="Futures"
        :color="market === 'Futures' ? 'primary' : ''"
        class="f-w-800 q-ml-sm transition-1"
        dense flat
        @click="market = 'Futures'"
      />

      <q-btn

        :color="market === 'Wishlist' ? 'primary' : ''"
        class="q-ml-sm transition-1"
        dense flat
        @click="market = 'Wishlist'"
      ><q-icon name="star" size="15px"/></q-btn>
    </div>
    <div class="col-12 col-sm-4 q-pb-sm">
      <q-input
        v-model="searchText"
        outlined dense clearable
        @clear="searchText = ''"
      >
        <template v-slot:prepend><q-icon name="search"/></template>
      </q-input>
    </div>
  </div>

  <div class="flex q-mt-sm">
    <div class="relative-position flex no-wrap items-center cursor-pointer">
      <q-btn
        v-if="sortField"
        icon="filter_list_off"
        flat dense no-caps
        size="sm"
        class="q-mr-sm"
        color="secondary"
        @click="sortField = ''"
      />
      <q-btn
        label="Токен"
        :icon-right="sortField === 'symbol' && this.sortUp ? 'expand_less' : 'keyboard_arrow_down'"
        size="sm"
        :color="sortField === 'symbol' ? 'primary' : ''"
        dense flat no-caps
        @click="setSort('symbol')"
      />
    </div>

<!--    <div class="relative-position col-sm-2 col-3 flex no-wrap items-center cursor-pointer">-->
<!--      <q-btn-->
<!--        label="Цена"-->
<!--        :icon-right="sortField === 'price' && this.sortUp ? 'expand_less' : 'keyboard_arrow_down'"-->
<!--        size="sm"-->
<!--        :color="sortField === 'price' ? 'primary' : ''"-->
<!--        dense flat no-caps-->
<!--        @click="setSort('price')"-->
<!--      />-->
<!--    </div>-->
    <div class="relative-position q-ml-md flex no-wrap items-center cursor-pointer">
      <q-btn
        label="Изменение"
        :icon-right="sortField === 'change' && this.sortUp ? 'expand_less' : 'keyboard_arrow_down'"
        size="sm"
        :color="sortField === 'change' ? 'primary' : ''"
        dense flat no-caps
        @click="setSort('change')"
      />
    </div>
  </div>

  <div v-if="symbols.length" class="orders-tickers">
    <q-infinite-scroll
      :offset="1000"
      @load="onLoad"
      ref="infiniteScroll"
    >
      <binance-market-ticker
        v-for="ticker in slicedData"
        :key="ticker.symbol"
        :ticker="ticker"
      />
    </q-infinite-scroll>
  </div>

  <div v-else style="height: 500px" class="flex flex-center">
    <q-btn
      size="lg"
      loading
      flat
    />
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import BasePageTitle from 'components/base-page-title'
import BinanceMarketTicker from 'components/binance-market/binance-market-ticker'

export default {
  name: 'binance-market',
  components: { BinanceMarketTicker, BasePageTitle },
  props: {
    wishlist: {
      type: Boolean,
      default: false
    },
    futures: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('binanceMarket', ['symbols', 'futureSymbols']),
    ...mapState('wishlist', { wishlistItems: 'wishlist' }),
    filteredTickers () {
      if (this.futures || this.market === 'Futures') {
        return this.futureSymbols.filter(item => item.symbol.toLowerCase().includes(this.searchText.toLowerCase()))
      }
      if (this.market === 'Wishlist') {
        return this.symbols.filter(item => this.wishlistItems.includes(item.symbol.replace('USDT', '')))
      }
      return this.symbols.filter(item => item.symbol.toLowerCase().includes(this.searchText.toLowerCase()))
    },
    sortedTickers () {
      const symbols = [...this.filteredTickers]
      if (this.sortField === 'symbol' && this.sortUp) {
        return symbols.sort((a, b) => {
          return a.symbol > b.symbol ? 1 : -1
        })
      }
      if (this.sortField === 'symbol' && !this.sortUp) {
        return symbols.sort((a, b) => {
          return a.symbol < b.symbol ? 1 : -1
        })
      }

      if (this.sortField === 'price' && this.sortUp) {
        return symbols.sort((a, b) => {
          return a.lastPrice > b.lastPrice ? 1 : -1
        })
      }
      if (this.sortField === 'price' && !this.sortUp) {
        return symbols.sort((a, b) => {
          return a.lastPrice < b.lastPrice ? 1 : -1
        })
      }

      if (this.sortField === 'change' && this.sortUp) {
        return symbols.sort((a, b) => {
          return a.priceChangePercent > b.priceChangePercent ? 1 : -1
        })
      }
      if (this.sortField === 'change' && !this.sortUp) {
        return symbols.sort((a, b) => {
          return a.priceChangePercent < b.priceChangePercent ? 1 : -1
        })
      }

      return symbols
    },
    slicedData () {
      return this.sortedTickers.slice(0, this.slice)
    }
  },
  data () {
    return {
      market: 'Spot',
      searchText: '',
      slice: 20,
      sortField: '',
      sortUp: false
    }
  },
  methods: {
    onLoad (index, done) {
      const vm = this
      if (vm.slice <= vm.slicedData.length) {
        vm.slice += 10
      }
      setTimeout(() => {
        if (vm.searchText && vm.getData.length < 12) {
          vm.$refs.infiniteScroll.stop()
        }
        done()
      }, 100)
    },
    setSort (field) {
      this.sortField = field
      this.sortUp = !this.sortUp
    }
  }
}
</script>

<style lang="sass">
.binance-orders
  .q-field--dense .q-field__control, .q-field--dense .q-field__marginal
    height: 33px !important
.up-sort-btn
  position: absolute
  bottom: -4px
  right: -20px

.down-sort-btn
  position: absolute
  top: -5px
  right: -20px

@media screen and (max-width: 700px)
  .binance-market-switcher
    text-align: right
</style>
