<template>
<div class="home-slider">
  <q-carousel
    animated
    v-model="slide"
    infinite
    keep-alive
    autoplay
    swipeable dark
    class="rounded-borders home-slider-carousel rounded-borders-xl"
  >
    <q-carousel-slide
      v-for="(slide, index) in slides"
      :key="slide.id"
      :name="index"
      :img-src="slide.image"
    >
        <div class="home-slider-meta">
          <h2 class="text-subtitle2 f-w-600 q-mt-sm" style="line-height: 1.2">
            <span v-html="slide.text"></span>
          </h2>
          <q-btn
            v-if="slide.url"
            :label="slide.btn_text"
            :to="slide.url"
            color="primary"
            size="sm"
            class="q-mt-md q-px-sm f-w-800"
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

.home-slider-carousel
  height: 130px
  position: relative

  &:before
    content: ''
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: rgba(0,0,0,.22)
</style>
