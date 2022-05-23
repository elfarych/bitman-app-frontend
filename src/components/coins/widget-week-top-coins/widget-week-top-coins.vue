<template>
<div class="widget-week-top-coins q-pt-lg">
  <div class="text-subtitle1 f-w-800">В тренде</div>
  <div v-if="topCoinsWithData.length">
    <coin-card
      v-for="coin in topCoinsWithData"
      :key="coin.id"
      :coin="coin"
      class="q-mt-sm"
    />
  </div>
  <div v-else>
    <q-skeleton
      v-for="index in 5"
      :key="index"
      width="100%"
      height="60px"
      class="rounded-borders q-mt-sm"
    />
  </div>
</div>
</template>

<script>
import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import config from 'src/config'
import CoinCard from 'components/coins/coin-card/coin-card'
let coinReloader

export default {
  name: 'widget-week-top-coins',
  components: { CoinCard },
  data () {
    return {
      topCoins: [],
      topCoinsWithData: []
    }
  },
  methods: {
    async loadTopCoinsFromCoinGecko () {
      try {
        await axios
          .get(`${config.coinGeckoAPI}/search/trending`)
          .then(res => {
            this.topCoins = res.data.coins.map(item => item.item.id)
          })
      } catch (e) {
        errorHandler(e)
      }
    },

    async loadTopCoins () {
      const vm = this
      try {
        await axios
          .get(`${config.coinGeckoBackend}/coins`, {
            params: {
              symbols: vm.topCoins.join(',')
            }
          })
          .then(res => {
            vm.topCoinsWithData = res.data.coins
          })
      } catch (e) {
        errorHandler(e)
      }
    }
  },
  async mounted () {
    await this.loadTopCoinsFromCoinGecko()
    if (this.topCoins.length) {
      await this.loadTopCoins()
    }
    coinReloader = setInterval(() => {
      this.loadTopCoins()
    }, 10000)
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(coinReloader)
    next()
  }
}

// Data example
// "item": {
//          "id": "feg-token-bsc",
//         "coin_id": 14533,
//         "name": "FEG Token BSC",
//         "symbol": "FEG",
//         "market_cap_rank": 395,
//         "thumb": "https://assets.coingecko.com/coins/images/14533/thumb/fav200.png?1622440270",
//         "small": "https://assets.coingecko.com/coins/images/14533/small/fav200.png?1622440270",
//         "large": "https://assets.coingecko.com/coins/images/14533/large/fav200.png?1622440270",
//         "slug": "feg-token-bsc",
//         "price_btc": 6.895482393569407e-14,
//         "score": 0
// }
</script>

<style scoped>

</style>
