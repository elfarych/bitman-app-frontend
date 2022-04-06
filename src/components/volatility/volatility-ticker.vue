<template>
  <q-item
    clickable
    :to="{ name: 'market-ticker-detail', params: { symbol: ticker.name } }"
    class="gate-ticker q-px-sm q-py-sm rounded-borders bg-dark hoverable block relative-position q-pb-lg"
  >

    <div class="gate-ticker-grid row  q-col-gutter-md">
      <!--      Name & price-->
      <div class="ticker-token col-4 l-h-12">
        <div class="ticker-ticker">
          <q-icon name="schedule" class="q-mr-xs"/>
          {{ $dayjs(ticker.date).format('DD.MM hh:mm:ss') }}
        </div>

        <div class="f-w-800 q-mt-xs flex items-center">
          <chart-popup-btn v-if="$mobile" :chart-symbol="ticker.name" class="q-mr-xs" :change="ticker.positive_change ? 1: -1"/>
          <chart-hover-btn v-else :chart-symbol="ticker.name" class="q-mr-xs" :change="ticker.positive_change ? 1: -1"/>
          {{ ticker.name }}
        </div>
        <div class="text-uppercase">
          <small class="q-ml-xs">{{ ticker.price }} usdt</small>
        </div>
      </div>

      <!--      Change per interval-->
      <div class="ticker-change col-4">
        <small class="ticker-interval block">
          Изменение за <span class="f-w-800">{{ ticker.interval }}</span>
        </small>
        <div class="q-mt-sm">
          <small class="q-pr-xs">Цена: </small><span :class="ticker.positive_change ? 'text-positive' : 'text-negative'" class="f-w-800">{{ priceChange }}%</span>
        </div>
        <div>
          <small>Объем: </small><span :class="ticker.volume_change > 0 ? 'text-positive' : 'text-negative'" class="f-w-800">{{ ticker.volume_change | tickerChangeFormatter }}</span>
        </div>
      </div>

      <!--      Change per 24 hour-->
      <div class="ticker-change col-4">
        <small class="ticker-interval block">
          Изменение за 24h
        </small>
        <div class="q-mt-xs">
          <small class="q-pr-xs">Цена: </small><span :class="ticker.change_per_24h > 0 ? 'text-positive' : 'text-negative'" class="f-w-800">{{ ticker.change_per_24h | tickerChangeFormatter }}</span>
        </div>

        <div
          class="ticker-change-volume-value text-white "
        >
          <span>Объем: </span><span class="text-uppercase f-w-800"> {{ ticker.volume | tickerVolumeFormatter }}</span>
        </div>
      </div>

      <small class="rounded-borders text-bold absolute-bottom-right text-warning q-pa-sm">{{ ticker.market }}</small>

    </div>
  </q-item>
</template>

<script>
import tickerChangeFormatter from 'src/filters/ticker-change-filter'
import tickerVolumeFormatter from 'src/filters/ticker-volume-formatter'
import ChartPopupBtn from 'components/chart/chart-popup-btn'
import ChartHoverBtn from 'components/chart/chart-hover-btn'

export default {
  name: 'volatility-ticker',
  components: { ChartHoverBtn, ChartPopupBtn },
  props: {
    ticker: {
      type: Object,
      default: () => {
      }
    }
  },
  filters: {
    tickerChangeFormatter,
    tickerVolumeFormatter
  },
  computed: {
    priceChange () {
      const prefix = this.ticker.positive_change ? '+' : '-'
      return prefix + this.ticker.change.toFixed(2)
    }
  },
  data () {
    return {
      newTicker: false,
      created: false
    }
  },
  methods: {}
}

// name = models.CharField('Токен', max_length=20)
// market = models.CharField(max_length=30, null=True, blank=True)
// change = models.FloatField(null=True, blank=True)
//  positive_change = models.BooleanField('Positive', default=False)
// price = models.FloatField(null=True, blank=True)
// interval = models.CharField('Интервал', max_length=30, null=True, blank=True)
// change_per_24h = models.FloatField(null=True, blank=True)
// min_per_24h = models.FloatField(null=True, blank=True)
// max_per_24h = models.FloatField(null=True, blank=True)
// link = models.CharField(max_length=50, null=True, blank=True)
// volume = models.FloatField(null=True, blank=True)
// volume_change = models.FloatField(null=True, blank=True)
// date = models.DateTimeField(auto_now_add=True)
</script>

<style lang="sass">
</style>
