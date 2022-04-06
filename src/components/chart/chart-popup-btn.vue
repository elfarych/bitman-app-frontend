<template>
<div class="chart-popup-btn">
  <q-btn
    :label="showLabel ? 'Показать график' : ''"
    :icon="change > 0 ? 'trending_up' : 'trending_down'"
    class=" rounded-borders f-w-600"
    :class="showLabel ? 'q-pa-sm' : ''"
    :color="change > 0 ? 'positive' : 'negative'"
    :outline="showLabel"
    :flat="!showLabel"
    :dense="!showLabel"
    no-caps
    @click.stop="showChartPopup($event)"
  />
</div>
</template>

<script>
export default {
  name: 'chart-popup-btn',
  props: {
    showLabel: {
      type: Boolean,
      default: false
    },
    chartSymbol: String,
    change: Number
  },
  methods: {
    async showChartPopup (event) {
      event.preventDefault()
      event.stopPropagation()
      await this.$router.replace({
        query: {
          ...this.$route.query,
          chart: this.chartSymbol
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
