<template>
<div class="wishlist-btn">
  <q-btn
    flat dense
    padding="3px"
    class="rounded-borders text-white-shadow-light"
    :color="symbolInWishlist ? 'primary' : ''"
    @click.stop="addToWish($event)"
  >
    <q-icon :name="starIcon" :size="size || '25px'"/>
  </q-btn>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'wishlist-btn',
  props: {
    symbol: String,
    size: String
  },
  methods: {
    ...mapActions('wishlist', ['addToWishList']),
    addToWish (event) {
      event.preventDefault()
      event.stopPropagation()
      this.addToWishList(this.symbol)
    }
  },
  computed: {
    ...mapState('wishlist', ['wishlist']),
    symbolInWishlist () {
      return this.wishlist.includes(this.symbol)
    },
    starIcon () {
      if (this.symbolInWishlist) return 'star'
      else return 'star_border'
    }
  }
}
</script>

<style scoped>

</style>
