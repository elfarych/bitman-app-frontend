<template>
<div class="gate-tickers" :class="$mobile ? 'q-pa-sm' : 'q-pa-md'">
  <div class="tickers-filter items-center row q-col-gutter-md">
    <div class="col-12 col-sm-6">
      <base-page-title :screener-link="screenerLink" :screener-name="screenerName" />
    </div>
    <div class="col-12 col-sm-6">
      <q-input
        v-model="searchText"
        outlined dense clearable
        @clear="searchText = ''"
      >
        <template v-slot:prepend><q-icon name="search"/></template>
      </q-input>
    </div>
  </div>
  <volatility-active-filters />
  <div
    v-for="(ticker, index) in filteredVolatilityTickers"
    :key="ticker.change + index"
  >
    <volatility-ticker :ticker="ticker" class="q-mt-sm"/>
  </div>

  <div v-if="!volatilityTickers.length">
    <base-no-data-vol />
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import BasePageTitle from 'components/base-page-title'
import BaseNoDataVol from 'components/base-no-data-vol'
import VolatilityTicker from 'components/volatility/volatility-ticker'
import VolatilityActiveFilters from 'components/volatility/volatility-active-filters'

export default {
  name: 'volatility-tickers',
  components: { VolatilityActiveFilters, VolatilityTicker, BaseNoDataVol, BasePageTitle },
  props: {
    screenerText: String,
    screenerName: String,
    screenerLink: String
  },
  computed: {
    ...mapState('volatility', ['volatilityTickers', 'volatilityFilter']),
    filteredVolatilityTickers () {
      const tickers = [...this.volatilityTickers]
      return tickers
        .filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()))
        .filter(item => this.volatilityFilter.interval ? item.interval === this.volatilityFilter.interval : true)
        .filter(item => Math.abs(item.change) >= this.volatilityFilter.changePercent)
        .filter(item => {
          if (this.volatilityFilter.showPositiveChange && !this.volatilityFilter.showNegativeChange) return item.positive_change
          else if (!this.volatilityFilter.showPositiveChange && this.volatilityFilter.showNegativeChange) return !item.positive_change
          return true
        })
    }
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {

  }
}

// name = models.CharField('Токен', max_length=20)
// market = models.CharField(max_length=30, null=True, blank=True)
// change = models.FloatField(null=True, blank=True)
// positive_change = models.BooleanField('Positive', default=False)
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
