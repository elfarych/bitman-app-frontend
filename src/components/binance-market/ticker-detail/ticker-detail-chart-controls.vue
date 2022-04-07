<template>
<div class="ticker-detail-chart-controls">
  <div class="flex justify-between" style="padding-right: 13px">
    <div>
      <q-btn
        v-if="!$mobile"
        :label="ordersChartMode ? 'График по умолчанию' : 'Заявки на графике'"
        color="secondary"
        flat dense no-caps
        class="f-w-600"
        @click="changeChartMode"
      />
    </div>
      <div>
        <q-btn
          v-if="!ordersChartMode"
          label="На весь экран"
          icon="fullscreen"
          color="secondary"
          flat dense no-caps
          outline
          @click="showChartPopup"
        />
      </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'ticker-detail-chart-controls',
  computed: {
    ordersChartMode () {
      return this.$route.query.chartMode && this.$route.query.chartMode.toString() === 'orders'
    }
  },
  methods: {
    changeChartMode () {
      const vm = this
      this.$router.replace({
        query: {
          ...this.$route.query,
          chartMode: vm.ordersChartMode ? undefined : 'orders'
        }
      })
    },
    showChartPopup (event) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          chart: this.$route.params.symbol
        }
      })
    }
  }
}
</script>

<style lang="sass">
.ticker-detail-chart-controls
  position: relative
  top: -25px
  left: 3px

@media screen and (max-width: 700px)
  .ticker-detail-chart-controls
    display: none
</style>
