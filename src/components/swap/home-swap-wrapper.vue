<template>
  <div class="home-swap-wrapper">
    <div class="row">

      <div class="col-12 col-md-6 q-pb-lg">
        <home-swap-left-block/>
      </div>

      <div class="col-12 col-md-6 flex justify-end">
        <swap />
      </div>
    </div>
  </div>
</template>

<script>
import HomeSwapLeftBlock from 'components/swap/home-swap-left-block'
import Swap from 'components/swap/swap'
export default {
  name: 'home-swap-wrapper',
  components: { Swap, HomeSwapLeftBlock },
  computed: {
  }
}
</script>

<style lang="sass">
.home-swap-wrapper-img
  position: absolute
  top: 0
  height: 380px
  left: 10% !important
  z-index: -1
  opacity: 0.5

.home-swap-wrapper
  position: relative
  min-height: 380px
  overflow-x: hidden
</style>
