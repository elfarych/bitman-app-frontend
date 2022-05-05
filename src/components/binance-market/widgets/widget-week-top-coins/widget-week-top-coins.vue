<template>
<div class="widget-week-top-coins bitman-border q-pa-md rounded-borders">
  <div class="text-subtitle1 f-w-800 text-center">В тренде за неделю</div>
  <div class="row q-mt-sm">
    <div class="col-3 offset-6">
      <small>Токен</small>
    </div>
    <div class="col-3 text-right">
      <small>Ранг</small>
    </div>
  </div>
  <widget-week-top-coins-card
    v-for="coin in topCoins"
    :key="coin.item.id"
    :coin="coin.item"
  />
</div>
</template>

<script>
import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import config from 'src/config'
import WidgetWeekTopCoinsCard from 'components/binance-market/widgets/widget-week-top-coins/widget-week-top-coins-card'

export default {
  name: 'widget-week-top-coins',
  components: { WidgetWeekTopCoinsCard },
  data () {
    return {
      topCoins: []
    }
  },
  methods: {
    async loadTopCoins () {
      try {
        await axios
          .get(`${config.nodeServerURI}/info/top-week-coins`)
          .then(res => {
            this.topCoins = res.data.data.coins
          })
      } catch (e) {
        errorHandler(e)
      }
    }
  },
  mounted () {
    this.loadTopCoins()
  }
}

// Data example
// "item": {
//     "id": "feg-token-bsc",
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
