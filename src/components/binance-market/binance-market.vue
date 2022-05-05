<template>
  <div class="binance-orders" id="binance-market-el">

    <portal to="title">
      <!--      Market switcher-->
      <div class="flex items-center full-height justify-center">
        <q-btn
          label="Спот"
          dense flat no-caps
          :color="market === 'Spot' ? 'primary' : ''"
          class="f-w-800 transition-1"
          @click="market = 'Spot'"
        />

        <q-btn
          label="Фьючерсы"
          :color="market === 'Futures' ? 'primary' : ''"
          class="f-w-800 q-ml-sm transition-1"
          dense flat no-caps
          @click="market = 'Futures'"
        />

        <q-btn

          :color="market === 'Wishlist' ? 'primary' : ''"
          class="q-ml-sm transition-1"
          dense flat
          @click="market = 'Wishlist'"
        >
          <q-icon name="star" size="15px"/>
        </q-btn>

        <q-btn

          :color="market === 'Metrics' ? 'primary' : ''"
          class="q-ml-sm transition-1 market-widget-panel-mobile-button"
          dense flat
          @click="market = 'Metrics'"
        >
          <q-icon name="leaderboard" size="15px"/>
        </q-btn>
      </div>
    </portal>

    <div class="row items-center">
      <div class="col-6 col-sm-4 q-pb-sm">
        <base-page-title screener-name="Рынок" screener-link="https://accounts.binance.com/ru/register?ref=368026154"
                         screener-text="" :real-time-text="false"/>
      </div>

      <!--      Search input-->
      <div class="col-6 col-sm-4 q-pb-md">
        <q-input
          v-model="searchText"
          dense clearable
          @clear="searchText = ''"
        >
          <template v-slot:prepend>
            <q-icon name="search"/>
          </template>
        </q-input>
      </div>

      <!--      Market switcher-->
      <div
        class="col-sm-4 col-12 q-pb-sm binance-market-switcher flex no-wrap q-mt-sm"
        :class="$mobile ? 'justify-between' : 'justify-end'"
      >
        <q-btn
          label="Спот"
          dense flat no-caps
          :color="market === 'Spot' ? 'primary' : ''"
          class="f-w-800 transition-1"
          @click="market = 'Spot'"
        />

        <q-btn
          label="Фьючерсы"
          :color="market === 'Futures' ? 'primary' : ''"
          class="f-w-800 q-ml-sm transition-1"
          dense flat no-caps
          @click="market = 'Futures'"
        />

        <q-btn
          :color="market === 'Wishlist' ? 'primary' : ''"
          class="q-ml-sm transition-1"
          dense flat no-wrap no-caps
          @click="market = 'Wishlist'"
        >
          <span class="f-w-800 q-ml-xs">Избранное</span>
        </q-btn>

        <q-btn
          :color="market === 'Metrics' ? 'primary' : ''"
          class="q-ml-sm transition-1 market-widget-panel-mobile-button"
          dense flat no-caps
          @click="market = 'Metrics'"
        >
          <span class="f-w-800 q-ml-xs">Метрики</span>
        </q-btn>
      </div>

    </div>

    <!--    Sort controls-->
    <div v-if="market !== 'Metrics'" class="flex q-mt-sm items-center no-wrap" style="overflow-x: scroll">
      <div class="relative-position flex no-wrap items-center cursor-pointer items-center">
        <q-btn
          label="Market cap"
          :icon-right="sortField === 'cap' && this.sortUp ? 'expand_less' : 'keyboard_arrow_down'"
          size="sm"
          :color="sortField === 'cap' ? 'primary' : ''"
          dense flat no-caps
          title="Капитализация"
          @click="setSort('cap')"
        />
      </div>

      <div class="relative-position q-ml-sm flex no-wrap items-center cursor-pointer">
        <q-btn
          label="Объем"
          :icon-right="sortField === 'volume' && this.sortUp ? 'expand_less' : 'keyboard_arrow_down'"
          size="sm"
          :color="sortField === 'volume' ? 'primary' : ''"
          dense flat no-caps
          @click="setSort('volume')"
        />

        <q-btn
          label="Цена"
          :icon-right="sortField === 'price' && this.sortUp ? 'expand_less' : 'keyboard_arrow_down'"
          size="sm"
          :color="sortField === 'price' ? 'primary' : ''"
          dense flat no-caps
          class="q-ml-sm"
          @click="setSort('price')"
        />
      </div>

      <div class="relative-position q-ml-sm flex no-wrap items-center cursor-pointer">
        <q-btn
          label="Изм. цены"
          :icon-right="sortField === 'change' && this.sortUp ? 'expand_less' : 'keyboard_arrow_down'"
          size="sm"
          :color="sortField === 'change' ? 'primary' : ''"
          dense flat no-caps
          @click="setSort('change')"
        />
      </div>
      <q-btn
        v-if="sortField"
        icon="filter_list_off"
        flat dense no-caps
        size="sm"
        class="q-ml-md"
        color="secondary"
        @click="sortField = ''"
      />
    </div>

    <!--    Market tickers-->
    <div v-if="symbols.length" class="orders-tickers">

      <div class="row q-col-gutter-sm relative-position">
        <div v-if="market !== 'Metrics'" class="col-12 col-sm-7">
          <q-infinite-scroll
            :offset="1000"
            @load="onLoad"
            ref="infiniteScroll"
          >
            <binance-market-ticker
              v-for="ticker in slicedData"
              :key="ticker.symbol"
              :ticker="ticker"
              class="q-mt-sm"
            />
          </q-infinite-scroll>
        </div>

        <div class="col-12 col-sm-5 q-mt-sm" :class="market !== 'Metrics' ? 'market-widget-panel' : 'block'">
          <binance-market-widgets-panel/>
        </div>

      </div>

      <div v-if="slicedData.length < sortedTickers.length" class="text-center q-mt-lg">
        Загрузка...
      </div>

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
import BinanceMarketTicker from 'components/binance-market/binance-market-ticker/binance-market-ticker'
import BinanceMarketWidgetsPanel from 'components/binance-market/binance-market-widgets-panel'

export default {
  name: 'binance-market',
  components: { BinanceMarketWidgetsPanel, BinanceMarketTicker, BasePageTitle },
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
        return this.futureSymbols.filter(item => item.symbol.toLowerCase().includes(this.searchText.toLowerCase()) || item.name?.toLowerCase().includes(this.searchText.toLowerCase()))
      }
      if (this.market === 'Wishlist') {
        return this.symbols
          .filter(item => this.wishlistItems.includes(item.symbol.replace('USDT', '')))
          .filter(item => item.symbol.toLowerCase().includes(this.searchText.toLowerCase()) || item.name?.toLowerCase().includes(this.searchText.toLowerCase()))
      }
      return this.symbols.filter(item => item.symbol.toLowerCase().includes(this.searchText.toLowerCase()) || item.name?.toLowerCase().includes(this.searchText.toLowerCase()))
    },
    sortedTickers () {
      const symbols = [...this.filteredTickers]

      if (this.sortField === 'cap' && this.sortUp) {
        return symbols
          .filter(item => item.marketCap)
          .sort((a, b) => {
            return a.marketCap > b.marketCap ? 1 : -1
          })
      }
      if (this.sortField === 'cap' && !this.sortUp) {
        return symbols
          .filter(item => item.marketCap)
          .sort((a, b) => {
            return a.marketCap < b.marketCap ? 1 : -1
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

      if (this.sortField === 'volume' && this.sortUp) {
        return symbols
          .filter(item => item.volume)
          .sort((a, b) => { return a.volume > b.volume ? 1 : -1 })
      }
      if (this.sortField === 'volume' && !this.sortUp) {
        return symbols
          .filter(item => item.volume)
          .sort((a, b) => { return a.volume < b.volume ? 1 : -1 })
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
      sortUp: true
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
  },
  created () {
    if (this.$route.query.market) {
      this.market = this.$route.query.market
    }
  },
  watch: {
    market () {
      const element = document.getElementById('q-app')
      element.scrollIntoView({ block: 'start', behavior: 'smooth' })
      this.$router.replace({
        query: {
          ...this.$route.query,
          market: this.market
        }
      })
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

.market-widget-panel-mobile-button
  display: none

@media screen and (max-width: 700px)

  .market-widget-panel
    display: none

  .market-widget-panel-mobile-button
    display: block
</style>
