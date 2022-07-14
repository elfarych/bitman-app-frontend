<template>
  <div class="coins-domination-slider q-mt-md">
    <swiper v-if="coinCategories" class="swiper" :options="swiperOptions">
      <swiper-slide
        v-for="category in categories"
        :key="category.id"
      >
        <coin-categories-card :category="category"/>
      </swiper-slide>
    </swiper>

    <swiper v-else class="swiper" :options="swiperOptions">
      <swiper-slide
        v-for="category in 10"
        :key="category"
      >
        <q-skeleton class="rounded-borders-xl full-width" style="height: 125px" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'
// import 'swiper/dist/css/swiper.min.css'
import { mapState } from 'vuex'
import CoinCategoriesCard from 'components/coins/coin-categories/coin-categories-card'

export default {
  name: 'coin-categories-slider',
  components: {
    CoinCategoriesCard,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  computed: {
    ...mapState('coins', ['coinCategories']),
    categories () {
      return this.coinCategories || []
    }
  },
  data () {
    return {
      swiperOptions: {
        spaceBetween: 7.5,
        breakpoints: {
          1600: {
            slidesPerView: 6.5
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
          330: {
            slidesPerView: 2.3
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
