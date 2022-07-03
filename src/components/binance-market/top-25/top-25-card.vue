<template>
  <q-item
    class="top-25-card bg-dark q-px-none q-py-sm rounded-borders-xl column"
    style="overflow: hidden !important;"
    title="Подробная информация"
    clickable
    :to="{ name: 'market-ticker-detail', params: { symbol: coinSlicedSymbol } }"
  >

<!--    Name & Logo-->
    <div class="flex items-center q-px-sm">

      <!--    Logo-->
      <div>
        <q-avatar size="30px" class="bg-transparent" square>
          <q-img
            v-if="coin.logo"
            :src="coin.logo"
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

      <!--    Name-->
      <div class="q-ml-sm">
        <div class="text-subtitle2 f-w-800 text-secondary-shadow text-secondary">
          {{ coin.fullName }}
        </div>
        <div class="small-text text-grey-5 flex justify-between" style="flex-grow: 1">
          <div class="">{{ coinSlicedSymbol }}</div>
          <div class="bg-warning text-dark q-px-sm rounded-borders q-ml-sm f-w-600">rank {{ coin.rank }}</div>
        </div>
      </div>
    </div>

<!--    Price & change-->
    <div class="flex q-mt-sm justify-between q-px-sm">
      <div>
        <div class="small-text text-grey-5">{{ $t('price') }}</div>
        <div class="f-w-800" :class="priceClass">${{ coin.lastPrice | tickerPriceFormatter }}</div>
      </div>

      <div class="text-right">
        <div class="small-text text-grey-5">{{ $t('change24') }}</div>
        <div class="f-w-800" :class="coin.priceChange >= 0 ? 'text-positive' : 'text-negative'">
          <span class="">{{ coin.priceChange > 0 ? '+' : '' }}</span>{{ changePercentFormattedValue }}%
        </div>
      </div>
    </div>

<!--    Cap info-->
    <div class="flex q-mt-sm justify-between q-px-sm">
      <div>
        <div class="small-text text-grey-5">{{ $t('marketCapSmall') }}</div>
        <div class="f-w-800 text-uppercase">{{ coin.marketCap | bigNumberFormatter }}</div>
      </div>

      <div class="text-right">
        <div class="small-text text-grey-5">{{ $t('volume24h') }}</div>
        <div class="f-w-800 text-uppercase">{{ coin.volume | bigNumberFormatter }}</div>
      </div>

    </div>

    <div class="q-mt-lg" style="margin-left: -3px">
      <top25-card-chart
        :symbol="coinSlicedSymbol"
        :change="changePercentValue"
      />
    </div>
  </q-item>
</template>

<script>
import tickerPriceFormatter from 'src/filters/ticker-price-formatter'
import bigNumberFormatter from 'src/filters/big-number-formatter'
import Top25CardChart from 'components/binance-market/top-25/top-25-card-chart'

export default {
  name: 'top-25-card',
  components: { Top25CardChart },
  props: {
    coin: {
      type: Object,
      default: () => {
      }
    }
  },
  filters: {
    tickerPriceFormatter, bigNumberFormatter
  },
  computed: {
    coinSlicedSymbol () {
      return this.coin.symbol.replace('USDT', '')
    },
    changePercentValue () {
      return this.coin.priceChangePercent
    },
    coinPrice () {
      return this.coin.lastPrice
    },
    changePercentFormattedValue () {
      return this.coin.priceChangePercent.toFixed(2)
    }
  },
  data () {
    return {
      price: this.ticker?.lastPrice || null,
      priceClass: 'text-white'
    }
  },
  watch: {
    coinPrice () {
      if (this.price < this.coin.lastPrice) {
        this.priceClass = 'text-positive'
      } else if (this.price > this.coin.lastPrice) {
        this.priceClass = 'text-negative'
      }
      setTimeout(() => {
        this.priceClass = 'text-white'
      }, 1100)
      this.price = this.coin.lastPrice
    }
  }
}
</script>

<style lang="sass">
.top-25-card
  //border: 1px solid $secondary
</style>
