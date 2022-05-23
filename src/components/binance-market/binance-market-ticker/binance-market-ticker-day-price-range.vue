<template>
<div class="binance-market-ticker-day-price-range">
  <div v-if="showMeta" class="flex justify-between items-end">

    <div>
      ${{ priceFormatter(lowPrice) }}
    </div>
    <div class="f-w-800 text-center">
      {{ title }}
      <div v-if="highTitle" class="flex justify-center">
        <span v-if="lowTitle" class="block small-text text-positive q-mr-sm">{{ lowTitle }}%</span>
        <span v-if="highTitle" class="block small-text text-negative q-ml-sm">{{ highTitle }}%</span>
      </div>
    </div>
    <div>
      ${{ priceFormatter(highPrice) }}
    </div>

  </div>
  <div class="relative-position rounded-borders bg-grey-9 overflow-hidden" :style="styles">
    <div
      :style="`width: ${lineWidth}%`"
      class="full-height absolute-left transition-1"
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
    lastPrice: Number,
    title: String,
    lowTitle: String,
    highTitle: String,
    showMeta: {
      type: Boolean,
      default: false
    },
    styles: {
      type: String,
      default: 'height: 5px'
    }
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
  },
  methods: {
    priceFormatter (price) {
      if (!price) return ''
      if (parseFloat(price) > 1000) {
        return new Intl.NumberFormat('en').format(parseFloat(price))
      }
      return parseFloat(price)
    }
  }
}
</script>

<style scoped>

</style>
