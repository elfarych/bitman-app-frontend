<template>
  <div class="left-drawer-market">

    <div class="q-px-xs q-pb-sm">
      <q-input
        v-model="searchText"
        outlined dense clearable
        @clear="searchText = ''"
      >
        <template v-slot:prepend>
          <q-icon name="search" size="22px" style="margin-left: -5px"/>
        </template>
      </q-input>
    </div>

    <div class="row q-pl-sm">
      <div class="relative-position col-6 flex no-wrap items-center cursor-pointer">
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

      <div class="relative-position col-3 flex no-wrap items-center cursor-pointer justify-end">
        <q-btn
          label="Цена"
          :icon-right="sortField === 'price' && this.sortUp ? 'expand_less' : 'keyboard_arrow_down'"
          size="sm"
          :color="sortField === 'price' ? 'primary' : ''"
          dense flat no-caps
          @click="setSort('price')"
        />
      </div>

      <div class="relative-position col-3 flex no-wrap items-center cursor-pointer justify-end">
        <q-btn
          label="Изм."
          :icon-right="sortField === 'change' && this.sortUp ? 'expand_less' : 'keyboard_arrow_down'"
          size="sm"
          :color="sortField === 'change' ? 'primary' : ''"
          dense flat no-caps
          @click="setSort('change')"
        />
      </div>
    </div>

    <q-scroll-area style="height: calc(100vh - 167px)" :thumb-style="thumbStyle" ref="drawerScroll" :delay="2000" visible>
      <q-list separator class="f-w-600">
        <q-infinite-scroll
          :offset="100"
          @load="onLoad"
          ref="infiniteScroll"
        >
          <div
            v-for="ticker in slicedData"
            :key="ticker.symbol"
          >
            <left-drawer-market-ticker :ticker="ticker"/>
          </div>
        </q-infinite-scroll>

      </q-list>
    </q-scroll-area>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import LeftDrawerMarketTicker from 'components/left-drawer/left-drawer-market-ticker'

export default {
  name: 'left-drawer-market',
  components: { LeftDrawerMarketTicker },
  props: {
    wishlistMode: {
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
    ...mapState('wishlist', ['wishlist']),
    filteredTickers () {
      let symbols = this.futures ? [...this.futureSymbols] : [...this.symbols]
      if (this.wishlistMode) {
        symbols = symbols.filter(item => this.wishlist.includes(item.symbol.replace('USDT', '')))
      }
      return symbols.filter(item => item.symbol.toLowerCase().includes(this.searchText.toLowerCase()))
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
      searchText: '',
      slice: 20,
      thumbStyle: {
        width: '0px',
        backgroundColor: 'transparent',
        opacity: 0.5
      },
      sortField: '',
      sortUp: false
    }
  },
  methods: {
    onLoad (index, done) {
      const vm = this
      if (vm.slice <= vm.slicedData.length) {
        vm.slice += 20
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
  watch: {
    sortField () {
      this.$refs.drawerScroll.setScrollPosition('vertical', 0)
    },
    sortUp () {
      this.$refs.drawerScroll.setScrollPosition('vertical', 0)
    }
  }
}
</script>

<style lang="sass">
.left-drawer-market
  .q-field--dense .q-field__control, .q-field--dense .q-field__marginal
    height: 30px !important
</style>
