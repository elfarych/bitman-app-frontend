<template>
<div class="chart-hover transition-05" :style="showChart ? 'opacity: 1' : 'opacity: 0'">
  <div
    v-if="showChart"
    class="chart-hover-dialog transition-05"
    style="cursor: move"
    :style="chartWrapperStyle"
    :draggable="true"
    @dragstart="startDrag($event)"
    @dragend="dragEnd($event)"
  >

    <div class="bg-dark text-right flex justify-between items-center">
      <div class="text-subtitle1 text-uppercase f-w-800">{{ hoverSymbol }}</div>
      <q-btn
        label="На весь экран"
        icon-right="fullscreen"
        no-caps dense flat
        @click="showFullScreenChart"
      />
      <q-btn
        icon-right="close"
        label="Close"
        flat dense no-caps
        class="rounded-borders"
        @click="closeChartPopup"
      />
    </div>
    <div id="hover-popup-chart" class="q-mt-sm">
      <VueTradingView :options="options" :key="hoverSymbol"/>
    </div>
  </div>
</div>
</template>

<script>
import VueTradingView from 'vue-trading-view'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'chart-hover',
  components: {
    VueTradingView
  },
  computed: {
    ...mapState('binanceMarket', ['hoverSymbol']),

    options () {
      const vm = this
      return {
        width: vm.width,
        height: vm.height,
        symbol: `BINANCE:${vm.hoverSymbol}USDT`,
        interval: '60',
        timezone: 'exchange',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#000000',
        enable_publishing: false,
        hide_side_toolbar: true,
        allow_symbol_change: false,
        show_popup_button: false,
        details: false,
        container_id: 'hover-popup-chart'
      }
    }
  },
  data () {
    return {
      widthOptions: ['300', '400', '500', '600', '700', '800', '900', '1000'],
      heightOptions: [300, 400, 500, 600, 700, 800, 900, 1000],
      showChart: false,
      width: 500,
      height: 400,
      clientX: 0,
      clientY: 0,

      chartWrapperStyle: {
        top: '10px',
        right: '10px',
        left: '',
        bottom: ''
      }
    }
  },

  methods: {
    ...mapMutations('binanceMarket', ['mutationHoverSymbol']),
    async showFullScreenChart (event) {
      await this.$router.replace({
        query: {
          ...this.$route.query,
          chart: this.hoverSymbol
        }
      })
      this.showChart = false
      this.mutationHoverSymbol('')
    },
    closeChartPopup () {
      this.showChart = false
      this.mutationHoverSymbol('')
    },
    startDrag (event) {
      this.clientX = event.clientX
      this.clientY = event.clientY
    },
    dragEnd (event) {
      if (event.clientX < this.clientX) {
        this.chartWrapperStyle.left = '5px'
        this.chartWrapperStyle.right = ''
      }

      if (event.clientX > this.clientX) {
        this.chartWrapperStyle.left = ''
        this.chartWrapperStyle.right = '5px'
      }

      if (event.clientY > this.clientY) {
        this.chartWrapperStyle.bottom = '5px'
        this.chartWrapperStyle.top = ''
      }

      if (event.clientY < this.clientY) {
        this.chartWrapperStyle.bottom = ''
        this.chartWrapperStyle.top = '5px'
      }
    }
  },

  watch: {
    hoverSymbol (val) {
      if (val) {
        this.showChart = true
      }
    }
  }
}
</script>

<style lang="sass">
.chart-hover-dialog
  position: fixed
  z-index: 9999
  padding: 10px
  border-radius: 8px
  box-shadow: 5px 5px 10px 0 rgba(0,0,0,.5)
  background: $dark
</style>
