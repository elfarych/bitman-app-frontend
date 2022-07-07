<template>
  <div class="top-25-slider q-mt-md">
    <swiper v-if="topCoins && topCoins.length" class="swiper" :options="swiperOptions">
      <swiper-slide
        v-for="coin in topCoins"
        :key="coin.marketCap"
      >
        <top25-card :coin="coin"/>
      </swiper-slide>
    </swiper>

    <swiper v-else class="swiper" :options="swiperOptions">
      <swiper-slide
        v-for="coin in 10"
        :key="coin"
      >
        <q-skeleton class="rounded-borders-xl full-width" style="height: 220px" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css'
import { mapState } from 'vuex'
import Top25Card from 'components/binance-market/top-25/top-25-card'

export default {
  name: 'top-25-slider',
  components: {
    Top25Card,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  computed: {
    ...mapState('binanceMarket', ['symbols']),
    topCoins () {
      const coins = [...this.symbols]
      return coins
        .filter(item => item.marketCap)
        .sort((a, b) => Number(a.marketCap) < Number(b.marketCap) ? 1 : -1).slice(0, 25)
    },
    categories () {
      return this.coinCategories || []
    }
  },
  data () {
    return {
      swiperOptions: {
        spaceBetween: 7.5,
        freeMode: !this.$mobile,
        breakpoints: {
          1600: {
            slidesPerView: 7.5
          },
          1400: {
            slidesPerView: 5.5
          },
          1279: {
            slidesPerView: 4.6
          },
          1000: {
            slidesPerView: 3.3
          },
          750: {
            slidesPerView: 3.3
          },
          300: {
            slidesPerView: 2.1
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
