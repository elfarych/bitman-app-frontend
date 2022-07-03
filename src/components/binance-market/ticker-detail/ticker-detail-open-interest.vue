<template>
  <div class="ticker-detail-open-interest f-w-800 fit ">
    <div v-if="openInterest.totalSum">
      <div class="flex justify-between items-center ">
        <div class="text-uppercase text-subtitle1 f-w-800 q-mt-lg">{{ $t('openInterest') }} 24H</div>
        <div class="flex items-center">
          <div class="text-primary q-mr-sm"></div>
<!--          <q-btn-->
<!--            icon="refresh"-->
<!--            flat dense-->
<!--            size="sm"-->
<!--            color="secondary"-->
<!--            :disable="disableLoader"-->
<!--            @click="reloadOpenInterest"-->
<!--          >-->
<!--          </q-btn>-->
        </div>

      </div>
      <div class="text-h6 q-mt-xs f-w-800 text-uppercase flex">
        {{ openInterest.totalSum | tickerVolumeFormatter }}

        <div class="text-h6 q-ml-sm f-w-800" :class="openInterest.change > 0 ? 'text-positive' : 'text-negative'">
          <span v-if="openInterest.change > 0">+</span>{{ openInterest.change }}%
        </div>
      </div>

    </div>

    <div v-else class="text-h5 text-grey fit flex flex-center f-w-800">
      <div >No data</div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import tickerVolumeFormatter from 'src/filters/ticker-volume-formatter'

export default {
  name: 'ticker-detail-open-interest',
  computed: {
    ...mapState('info', ['openInterest'])
  },
  filters: {
    tickerVolumeFormatter
  },
  data () {
    return {
      percent: 5,
      disableLoader: false
    }
  },
  methods: {
    ...mapActions('info', ['loadOpenInterest']),
    reloadOpenInterest () {
      this.disableLoader = true
      this.loadOpenInterest()
      setTimeout(() => {
        this.disableLoader = false
      }, 10000)
    }
  },
  mounted () {
    setTimeout(() => {
      this.loadOpenInterest()
    }, 2000)
  },
  watch: {

    '$route.params.symbol' () {
      this.loadOpenInterest()
    }
  }
}
</script>

<style lang="sass">
.ticker-detail-open-interest
  //background: $dark
  padding: 10px
</style>
