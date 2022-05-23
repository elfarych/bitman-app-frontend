<template>
  <q-item class="coin-domination-card bg-dark rounded-borders q-pa-sm column rounded-borders-xl secondary-shadow-inset">
    <div class="text-center text-secondary f-w-800" :title="category.name" style="height: 35px; letter-spacing: 1px;">
      {{ category.name }}
    </div>
    <div class="q-mt-md flex justify-between">
      <div class="">
        <span class="block small-text">капитализация</span>
        <div class="flex">
          <div class="f-w-800 text-uppercase">
            {{ category.market_cap | bigNumberFormatter }}
          </div>
          <div :class="category.market_cap_change_24h > 0 ? 'text-positive' : 'text-negative'" class="small-text q-pl-xs f-w-800">
            <span v-if="category.market_cap_change_24h > 0">+</span>{{ categoryMarketCapChangePercentage }}%
          </div>
        </div>

        <div class="q-mt-sm">
          <span class="block small-text">объем 24ч</span>
          <span class="f-w-800 text-uppercase l-h-12">
      {{ category.volume_24h | bigNumberFormatter }}
    </span>
        </div>
      </div>

      <div>
        <div
          v-for="image in category.top_3_coins"
          :key="image"
          class="q-mt-xs"
        >
          <q-img :src="image" width="20px" height="20px" class="rounded-borders">
            <template v-slot:loading>
              <q-skeleton class="fit"/>
            </template>
          </q-img>
        </div>
      </div>
    </div>

  </q-item>
</template>

<script>
import bigNumberFormatter from 'src/filters/big-number-formatter'

export default {
  name: 'coin-categories-card',
  props: {
    category: {
      type: Object,
      default: () => {
      }
    }
  },
  filters: {
    bigNumberFormatter
  },
  computed: {
    categoryMarketCapChangePercentage () {
      return this.category.market_cap_change_24h.toFixed(2)
    }
  }
}
</script>

<style lang="sass">
.coin-domination-card
  border: 1px solid $secondary
  height: 140px
</style>
