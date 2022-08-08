<template>
<div class="q-pa-md trade-chart bg-dark">
  <div class="flex items-center justify-between">
    <div class="text-h6 text-bold">
      DOGS <span :class="coinInfo.change > 0 ? 'text-positive' : 'text-negative'">
        <span v-if="coinInfo.change > 0"> +</span>{{ coinInfo.change }}%</span>
    </div>
    <div class="text-bold q-ml-xl text-right">volume 24h<br> <span class="text-accent text-subtitle1">${{ coinInfo.volume | numberFormatter }}</span></div>
  </div>

  <div>
    <chart-img />
  </div>

</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import numberFormatter from 'src/utils/number-formatter'
import ChartImg from 'components/trade-chart/trade-chart-img'

export default {
  name: 'trade-chart',
  components: { ChartImg },
  filters: {
    numberFormatter
  },
  computed: {
    ...mapState('wallet', ['dogsPrice']),
    ...mapState('chart', ['coinInfo']),
    swapCoins () {
      return this.$route.query.s
    }
  },
  methods: {
    ...mapActions('chart', ['loadCoinInfo'])
  },
  mounted () {
    this.loadCoinInfo()
  }
}
</script>

<style lang="sass">
.trade-chart
  height: 530px
  width: 100%
  border-radius: 25px
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 20px -10px
</style>
