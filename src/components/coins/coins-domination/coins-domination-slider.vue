<template>
  <splide :options="options">

  </splide>
</template>

<script>
import { Splide } from '@splidejs/vue-splide'
import { mapState } from 'vuex'

export default {
  name: 'coins-domination-slider',
  components: {
    Splide
  },
  computed: {
    ...mapState('coins', ['globalData']),
    dominateCoins () {
      debugger
      return this.globalData?.market_cap_percentage || {}
    },
    dominateCoinsArr () {
      const arr = []
      debugger
      for (const key in this.dominateCoins) {
        arr.push({ name: key, percent: this.dominateCoins[key] })
      }
      debugger
      return arr
    }
  },
  data () {
    return {
      options: {
        type: 'slide',
        perPage: 5.5,
        arrows: true,
        pagination: false,
        perMove: 1,
        gap: 20,
        breakpoints: {
          1100: {
            type: 'slide',
            perPage: 3.3,
            arrows: false
          },
          650: {
            type: 'slide',
            perPage: 2.5,
            arrows: false,
            perMove: 1
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
