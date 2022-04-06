<template>
<div class="active-filters q-mt-md">
  <q-chip size="12px" @click="showFilters" clickable class="bg-info text-white f-w-600">
    <q-icon name="update" size="20px"/>
    <div class="q-ml-xs q-mt-xs">{{ volatilityFilter.interval || 'Все' }}</div>
    <q-tooltip>Изменение стоимости за {{ volatilityFilter.interval }} в заданных процентах</q-tooltip>
  </q-chip>

  <q-chip size="12px" class="flex items-center bg-info text-white f-w-600" @click="showFilters" clickable>
    <q-icon name="swap_vert" size="20px"/>
    <div class="q-ml-xs q-mt-xs">{{ volatilityFilter.changePercent }}%</div>
    <q-tooltip>Измненение стоимости за заданный интервал</q-tooltip>
  </q-chip>

  <q-chip v-if="changeType" size="12px" class="bg-info text-white f-w-600" @click="showFilters" clickable>
    <q-icon :name="changeType.icon" size="20px"/>
    <div class="q-ml-xs q-mt-xs">{{ changeType.title }}</div>
  </q-chip>

  <q-chip color="secondary" size="12px" class="cursor-pointer bg-info text-white f-w-600" clickable @click="showFilters">
    <q-icon name="tune" size="20px"/>
    <div class="q-ml-xs q-mt-xs">Изменить</div>
  </q-chip>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'volatility-active-filters',
  computed: {
    ...mapState('volatility', ['volatilityFilter']),
    changeType () {
      if (this.volatilityFilter.showPositiveChange && !this.volatilityFilter.showNegativeChange) return { title: 'Up', icon: 'trending_up' }
      if (!this.volatilityFilter.showPositiveChange && this.volatilityFilter.showNegativeChange) return { title: 'Down', icon: 'trending_down' }
      return false
    }
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
  }
}
</script>

<style scoped>

</style>
