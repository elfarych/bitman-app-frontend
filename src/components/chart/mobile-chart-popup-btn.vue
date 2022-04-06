<template>
<div class="mobile-chart-popup-btn">
  <q-btn
    icon="candlestick_chart"
    flat
    dense
    @click.stop="showChartPopup($event)"
  />
</div>
</template>

<script>
export default {
  name: 'mobile-chart-popup-btn',
  props: {
    symbol: String
  },
  methods: {
    async showChartPopup (event) {
      event.preventDefault()
      event.stopPropagation()
      await this.$router.replace({
        query: {
          ...this.$route.query,
          chart: this.symbol
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
