<template>
<div class="base-no-data-vol flex flex-center column text-subtitle1 f-w-600" style="height: 300px">
  <div v-if="!loading">
    Нет данных...
    <q-btn
      label="Изменить фильтр"
      outline no-caps
      class="q-mt-md rounded-borders q-pa-sm"
      @click="showFilters"
    />
  </div>
  <q-btn
    v-else
    loading flat
    size="lg"
  />
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'base-no-data-vol',
  computed: {
    ...mapState('volatility', ['volatilityTickers'])
  },
  methods: {
    showFilters () {
      const vm = this
      if (!vm.$route.query.filter) {
        vm.$router.replace({
          query: {
            ...vm.$route.query,
            filter: 1
          }
        })
      }
    }
  },
  data () {
    return {
      interval: null,
      loading: false
    }
  },
  created () {
    this.loading = true
    this.interval = setInterval(() => {
      if (this.volatilityTickers.length) this.loading = false
    }, 1000)
  },
  beforeRouteLeave () {
    this.interval.clearInterval()
  }
}
</script>

<style scoped>

</style>
