<template>
<div class="home-slider">
  <q-carousel
    animated
    v-model="slide"
    arrows
    infinite
    keep-alive
    autoplay
    swipeable dark
    class="rounded-borders"
  >
    <q-carousel-slide
      v-for="(slide, index) in slides"
      :key="slide.id"
      :name="index"
      :img-src="slide.image"
    >
        <div class="home-slider-meta q-pa-md">
          <h1 class="text-h4 f-w-800" style="line-height: 1.1">{{ slide.title }}</h1>
          <h2 class="text-subtitle1 q-mt-sm" style="line-height: 1.2">{{ slide.text }}</h2>
          <q-btn
            v-if="slide.url"
            :label="slide.btn_text"
            :to="slide.url"
            color="primary"
            no-caps
            class="q-mt-md q-px-sm f-w-800 rounded-borders"
          />
        </div>
    </q-carousel-slide>

  </q-carousel>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home-slider',
  computed: {
    ...mapState('siteInfo', ['slides'])
  },
  data () {
    return {
      slide: 0
    }
  }
}
</script>

<style lang="sass">
.home-slider-meta
  position: absolute
  bottom: 10px
  left: 10px
</style>
