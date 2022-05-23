<template>
  <q-item
    class="coin-card bg-dark rounded-borders q-pa-xs"
    clickable
  >

    <div class="row full-width items-center">
      <div class="col-6 col-md-4">
        <div class="flex items-center full-width">
          <!--  Coin avatar-->
          <div>
            <q-avatar size="20px" class="bg-transparent">
              <q-img
                :src="coin.logo_url"
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

          <div class="cursor-pointer text-white f-w-800 q-ml-sm " style="line-height: 1.2">
            <div class="text-white-shadow-light relative-position flex items-start ellipsis">
              {{ coin.en_name }}
            </div>
            <small class="block f-w-200 small-text text-grey-5 text-uppercase">
              {{ coin.short_name }}
              <span v-if="coin.coin_rank" class="q-ml-sm text-lowercase text-warning f-w-800">{{
                  coin.coin_rank
                }}</span>
            </small>

            <div class="fontsize-13 flex items-center q-mt-xs">
              ${{ coinPrice | tickerPriceFormatter }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-3 col-md-4">
        <div class="row items-center full-height text-right">

          <!--          24 hour-->
          <div class="col-12 col-md-6">
            <small class="block f-w-400 small-text text-grey-5">24 часа</small>
            <span
              v-if="change24"
              class="text-uppercase text-subtitle2 f-w-800 l-h-12"
              :class="change24 > 0 ? 'text-positive' : 'text-negative'"
            >
              <span v-if="change24 > 0">+</span>{{ change24 }}%
            </span>
          </div>

          <!--7 days-->
          <div class="col-12 col-md-6">
            <small class="block f-w-400 small-text text-grey-5">7 дней</small>
            <span
              v-if="change7"
              class="text-uppercase text-subtitle2 f-w-800 l-h-12"
              :class="change7 > 0 ? 'text-positive' : 'text-negative'"
            >
              <span v-if="change7 > 0">+</span>{{ change7 }}%
            </span>
          </div>

        </div>
      </div>

      <div class="col-3 col-md-4">
        <div class="row items-center full-height text-right">

          <!--          24 volume-->
          <div class="col-12 col-md-6">
            <small class="block f-w-400 small-text text-grey-5">объем 24ч</small>
            <span
              v-if="change24"
              class="text-uppercase text-subtitle2 f-w-800 l-h-12"
            >
              {{ volume | bigNumberFormatter }}
            </span>
          </div>

          <!--Cap-->
          <div class="col-12 col-md-6">
            <small class="block f-w-400 small-text text-grey-5">капитализация</small>
            <span
              v-if="cap"
              class="text-uppercase text-subtitle2 f-w-800 l-h-12"
            >
              {{ cap | bigNumberFormatter }}
            </span>
          </div>

        </div>
      </div>

    </div>

  </q-item>
</template>

<script>
import tickerPriceFormatter from 'src/filters/ticker-price-formatter'
import bigNumberFormatter from 'src/filters/big-number-formatter'

export default {
  name: 'coin-card',
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
    coinPrice () {
      return parseFloat(this.coin.price)
    },
    change24 () {
      return parseFloat(this.coin['24h'])
    },
    change7 () {
      return parseFloat(this.coin['7d'])
    },
    volume () {
      return parseInt(this.coin.volume_24h.split(',').join(''))
    },
    cap () {
      return parseInt(this.coin.max_amount_price.split(',').join(''))
    }
  },
  data () {
    return {
      priceClass: 'text-white',
      price: this.coin.price
    }
  },

  watch: {
    coinPrice (val) {
      if (this.price < val) {
        this.priceClass = 'text-positive'
      } else if (this.price > val) {
        this.priceClass = 'text-negative'
      }
      this.price = val
    }
  }
}

// COIN EXAMPLE
// 1h: "-0.6%"
// 1h_color: "#007980"
// 1h_math: ""
// 7d: "-7.6%"
// 7d_color: "#007980"
// 7d_math: ""
// 24h: "-6.6%"
// 24h_color: "#007980"
// 24h_math: ""
// cn_name: "TerraUSD"
// coin_id: "terrausd"
// coin_rank: "10"
// conversion: "165.32"
// en_name: "TerraUSD"
// id: "10055"
// inst_time: "2021-11-22 11:58:15"
// inst_user_no: "coingecko"
// is_up: "1"
// logo_url: "https://image.gatedataimg.com/picture_10055.png?AWSAccessKeyId=AKIASRVUDYVMTRKUTJFJ&Signature=9jv41w5t0B6ojx15pqqakXte0rw%3D&Expires=1672046228"
// max_amount_price: "16,531,912,077"
// max_amount_price_rmb: "105804237292.80"
// price: "0.924863"
// price_rmb: "5.91"
// short_name: "UST"
// updt_time: "2022-05-10 22:40:27"
// volume_24h: "7,532,487,972"
// volume_24h_rmb: "48207923020.80"
</script>

<style lang="sass">
.coin-card
  height: 60px

@media screen and (max-width: 992px)
  .coin-card
    height: 70px
</style>
