<template>
  <div class="widget-week-top-coins-card q-mt-sm">
    <div class="row items-center f-w-800">
      <div class="col-6 flex items-center no-wrap">
        <q-avatar :size="$mobile ? '20px' : '30px'" class="bg-transparent" square>
          <q-img
            v-if="coin.small || coin.thumb"
            :src="coin.small || coin.thumb"
            contain
            class="rounded-borders"
            img-class="white-shadow"
          >
            <template v-slot:loading>
              <q-skeleton class="fit"/>
            </template>
          </q-img>
        </q-avatar>
        <div class="q-ml-sm">
          {{ coin.name }}
        </div>
      </div>

      <div class="col-3">
        {{ coin.symbol }}
      </div>

      <div class="col-3 text-right">
        {{ coin.market_cap_rank }}
      </div>

    </div>

    <q-separator class="q-mt-sm"/>
  </div>
</template>

<script>
export default {
  name: 'widget-week-top-coins-card',
  props: {
    coin: {
      type: Object,
      default: () => {
      }
    }
  }
}

// Data example
//  {
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
