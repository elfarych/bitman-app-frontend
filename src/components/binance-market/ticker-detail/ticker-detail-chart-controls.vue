<template>
<div class="ticker-detail-chart-controls">
  <div class="flex justify-between" style="padding-right: 13px; ">
    <div>
      <q-btn
        :label="ordersChartMode ? $t('default') : $t('ordersOnChart')"
        color="secondary"
        flat dense
        class="f-w-800 text-secondary-shadow"
        @click="changeChartMode"
      />
    </div>
      <div>
        <q-btn
          v-if="!ordersChartMode"
          :label="$t('fullScreen')"
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
  top: 0
  left: 3px

@media screen and (max-width: 700px)
  .ticker-detail-chart-controls
    display: none
</style>
