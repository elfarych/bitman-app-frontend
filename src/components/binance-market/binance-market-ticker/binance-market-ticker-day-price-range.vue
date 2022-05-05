<template>
<div class="binance-market-ticker-day-price-range">
  <div class="relative-position rounded-borders bg-grey-7 overflow-hidden" style="height: 5px">
    <div
      :style="`width: ${lineWidth}%`"
      class="full-height absolute-left"
      :class="lastPrice > avgPrice ? 'bg-positive' : 'bg-negative'"
    ></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'binance-market-ticker-day-price-range',
  props: {
    lowPrice: Number,
    highPrice: Number,
    lastPrice: Number
  },
  computed: {
    avgPrice () {
      return (this.lowPrice + this.highPrice) / 2
    },
    fullValue () {
      return this.highPrice - this.lowPrice
    },
    currentValue () {
      return this.highPrice - this.lastPrice
    },
    lineWidth () {
      return 100 - ((this.currentValue * 100) / this.fullValue)
    }
  }
}
</script>

<style scoped>

</style>
