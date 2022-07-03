<template>
  <div class="ticker-detail-cash-flow rounded-borders q-mt-md">
    <div >
      <div class="f-w-800 text-subtitle1 f-w-800 q-mt-lg text-uppercase flex justify-between items-center">
        <span class="block">{{ $t('cashFlow') }}</span>
        <q-btn
          icon="refresh"
          flat dense
          color="secondary"
          class="q-ml-sm"
          :disable="disableLoader"
          @click="reloadCashFlow"
        />
      </div>

      <div v-if="cashFlow && cashFlow.length">
        <div class="row q-mt-md items-center f-w-600">
          <div class="col-3">
            {{ $t('date') }}
          </div>
          <div class="col-3 text-right">
            {{ $t('in') }}
          </div>
          <div class="col-3 text-right">
            {{ $t('out') }}
          </div>
          <div class="col-3 text-right">
            {{ $t('netInflow') }}
          </div>
        </div>

        <q-scroll-area style="height: 400px" class="q-py-md" :thumb-style="thumbStyle">
          <div
            v-for="cash in cashFlow"
            :key="cash.time"
            class="q-mt-sm"
          >
            <div v-if="cash.time" class="row text-uppercase">
              <div class="col-3">
                {{ cash.time }}
              </div>
              <div class="col-3 f-w-800 text-positive text-right">
                {{ cash.inFlow | tickerVolumeFormatter }}
              </div>
              <div class="col-3 f-w-800 text-negative text-right">
                {{ cash.outFlow | tickerVolumeFormatter }}
              </div>
              <div class="col-3 f-w-800 text-right" :class="cash.netInflow > 0 ? 'text-positive' : 'text-negative'">
                {{ cash.netInflow | tickerVolumeFormatter }}
              </div>
            </div>
            <q-separator v-if="cash.time" class="q-mt-sm"/>
          </div>
        </q-scroll-area>

        <div class="row items-center q-pa-sm rounded-borders bg-dark">
          <div class="col-3 f-w-800">
            {{ $t('totalSum') }}:
          </div>
          <div class="col-3 f-w-800 text-positive text-right text-uppercase">
            {{ weeklyInFlow | tickerVolumeFormatter }}
          </div>
          <div class="col-3 f-w-800 text-negative text-right text-uppercase">
            {{ weeklyOutFlow | tickerVolumeFormatter }}
          </div>
          <div class="col-3 f-w-800 text-right text-uppercase" :class="weeklyNetFlow > 0 ? 'text-positive' : 'text-negative'">
            {{ weeklyNetFlow | tickerVolumeFormatter }}
          </div>
        </div>
      </div>

      <div v-else class="text-h5 text-grey fit flex flex-center f-w-800 q-py-xl">
        <div>No data</div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import tickerVolumeFormatter from 'src/filters/ticker-volume-formatter'

export default {
  name: 'ticker-detail-cash-flow',
  filters: {
    tickerVolumeFormatter
  },
  computed: {
    ...mapState('info', ['cashFlow']),
    showCashFlow () {
      return this.cashFlow && this.loadCashFlow.length
    },
    weeklyInFlow () {
      let sum = 0
      this.cashFlow.forEach(item => {
        if (item.inFlow) sum += item.inFlow
      })

      return sum
    },
    weeklyOutFlow () {
      let sum = 0
      this.cashFlow.forEach(item => {
        if (item.outFlow) sum += item.outFlow
      })

      return sum
    },
    weeklyNetFlow () {
      let sum = 0
      this.cashFlow.forEach(item => {
        if (item.netInflow) sum += item.netInflow
      })

      return sum
    }
  },
  methods: {
    ...mapActions('info', ['loadCashFlow']),
    async reloadCashFlow () {
      this.disableLoader = true
      await this.loadCashFlow()

      setTimeout(() => {
        this.disableLoader = false
      }, 10000)
    }
  },
  mounted () {
    setTimeout(() => {
      this.loadCashFlow()
    }, 3000)
  },
  watch: {
    '$route.params.symbol' () {
      this.loadCashFlow()
    }
  },
  data () {
    return {
      disableLoader: false,
      thumbStyle: {
        right: '1px',
        borderRadius: '5px',
        width: '3px',
        opacity: 0.2
      }
    }
  }
}
</script>

<style lang="sass">
.ticker-detail-cash-flow
  //background: $dark
  padding: 10px
</style>
