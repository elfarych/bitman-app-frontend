<template>
<div class="news-slider">
  <swiper v-if="coindarTopNews && coindarTopNews.length" class="swiper" :options="swiperOptions">
    <swiper-slide
      v-for="news in coindarTopNews"
      :key="news.source"
    >
      <news-card :news="news"/>
    </swiper-slide>
  </swiper>

  <swiper v-else class="swiper" :options="swiperOptions">
    <swiper-slide
      v-for="coin in 10"
      :key="coin"
    >
      <q-skeleton class="rounded-borders-xl full-width" style="height: 230px" />
    </swiper-slide>
  </swiper>
</div>
</template>

<script>
import { directive, Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { mapState } from 'vuex'
import NewsCard from 'components/news/news-widget/news-card'

export default {
  name: 'news-slider',
  components: {
    NewsCard,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  computed: {
    ...mapState('news', ['coindarTopNews'])
  },
  data () {
    return {
      swiperOptions: {
        spaceBetween: 7.5,
        freeMode: !this.$mobile,
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
          300: {
            slidesPerView: 1.7
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
