<template>
  <div>
    <div v-show="showFilters" class="">
      <q-card
        dark
        class="tickers-filter-dialog"
        style="width: 700px; max-width: 100%; opacity: .99"
      >
        <q-toolbar style="border-bottom: 1px solid grey">
          <q-toolbar-title class="f-w-800 text-uppercase">Фильтр</q-toolbar-title>
          <q-btn dense flat icon="close" @click="closeFilter"/>
        </q-toolbar>

        <q-card-section >
          <!--        Изменение стоимости-->
          <div class="text-h6 text-white-shadow f-w-800">Волатильность</div>
          <div class="q-mt-lg">
            <div class="q-mb-sm f-w-600">Интервал:</div>
            <q-btn
              v-for="interval in intervals"
              :key="interval"
              :label="interval || 'Все'"
              outline no-caps
              :class="tFilters.interval === interval ? 'text-white-shadow' : ''"
              :color="tFilters.interval === interval ? 'white' : 'grey-7'"
              class="q-ma-xs rounded-borders"
              @click="setInterval(interval)"
            />
          </div>

          <div class="q-mt-lg">
            <div class="f-w-600">Изменение цены:</div>
            <q-checkbox v-model="tFilters.showPositiveChange" label="Рост" color="secondary" class=""/>
            <q-checkbox v-model="tFilters.showNegativeChange" label="Падение" color="secondary" class="q-ml-md"/>

            <div class="filter-change-percent q-mt-md f-w-600">
              Показывать изменения от <span class="text-primary text-bold">{{ tFilters.changePercent }}%</span>
            </div>
            <div class="q-pa-sm">
              <q-slider v-model="tFilters.changePercent" :min="3" :max="50" :step="1" color="secondary"/>
            </div>

          </div>

        </q-card-section>

        <q-card-section class="q-mt-lg">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-btn
                color="grey-6"
                label="Сбросить все фильтры"
                no-caps
                outline
                :loading="resetLoading"
                class="fit text-bold q-py-sm rounded-borders"
                @click="resetFilters"
              />
            </div>

            <div class="col-12 col-sm-6">
              <q-btn
                color="primary"
                label="Применить фильтры"
                no-caps unelevated
                text-color="dark"
                class="fit text-bold q-py-sm rounded-borders"
                :loading="setLoading"
                @click="setFilters"
              />
            </div>
          </div>

        </q-card-section>
      </q-card>
    </div>
  </div>

</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import notifier from 'src/utils/notifier'
// import notifier from 'src/utils/notifier'

export default {
  name: 'volatility-tickers-filter',
  computed: {
    ...mapState('volatility', ['volatilityFilter', 'markets'])
  },
  data () {
    return {
      dialog: true,
      resetLoading: false,
      setLoading: false,
      showFilters: false,
      tFilters: {},
      intervals: [
        '', '15s', '3Os', '1m', '5m', '1h'
      ]
    }
  },
  methods: {
    ...mapMutations('volatility', ['mutationVolatilityFilter']),
    ...mapActions('volatility', ['loadVolatilityTickers']),
    async setFilters () {
      if (!this.tFilters.showPositiveChange && !this.tFilters.showNegativeChange) {
        this.tFilters.showPositiveChange = true
        this.tFilters.showNegativeChange = true
      }

      this.mutationVolatilityFilter(this.tFilters)
      localStorage.setItem('filters', JSON.stringify(this.tFilters))
      await this.loadVolatilityTickers()
      notifier('Фильтры применены.', 'primary')

      this.closeFilter()
    },
    setInterval (interval) {
      this.tFilters.interval = interval
    },
    async resetFilters () {
      this.tFilters = {
        interval: '',
        showPositiveChange: true,
        showNegativeChange: true,
        changePercent: 5
      }
      this.mutationVolatilityFilter(this.tFilters)
      localStorage.setItem('filters', JSON.stringify(this.tFilters))
      await this.loadVolatilityTickers()

      notifier('Установлены фильтры по умолчанию.', 'dark')
      this.closeFilter()
    },
    closeFilter () {
      const vm = this
      vm.$router.replace({
        query: {
          ...vm.$route.query,
          filter: undefined
        }
      })
    }
  },
  created () {
    if (this.$route.query.filter) {
      this.showFilters = true
    }
    if (localStorage.getItem('filters')) {
      const filters = JSON.parse(localStorage.getItem('filters'))
      this.mutationVolatilityFilter(filters)
      this.tFilters = filters
    } else {
      this.tFilters = JSON.parse(JSON.stringify(this.volatilityFilter))
      localStorage.setItem('filters', JSON.stringify(this.volatilityFilter))
    }
  },
  watch: {
    '$route.query.filter' (val) {
      this.showFilters = !!val
    }
  }
}
</script>

<style lang="sass">
.tickers-filter-dialog
  position: fixed
  top: 0
  right: 0
  bottom: 0
  z-index: 10000
</style>
