<template>
<div class="trader-case-list-item-fixed-token q-mt-sm flex items-center no-wrap" style="overflow-x: scroll">
  <div>
    <q-avatar :size="$mobile ? '25px' : '30px'" class="bg-transparent" square>
      <q-img
        v-if="token.logo"
        :src="token.logo"
        contain
        class="rounded-borders"
        img-class="white-shadow"
      >
        <template v-slot:loading>
          <q-skeleton class="fit"/>
        </template>
      </q-img>
    </q-avatar>
  </div>

  <div>
    <div class="f-w-800 q-ml-sm">
      <small class="f-w-400 text-grey-5">{{ $dayjs(token.date).format('DD.MM.YYYY') }}</small>
    </div>

    <div class="flex">
      <div class="f-w-800 q-ml-sm">
        {{ token.quantity_base_asset }} {{ token.symbol }}
      </div>

      <div class="f-w-800 q-ml-sm">
        <small class="f-w-400 text-grey-5">по цене: </small>
        {{ token.price }}$
      </div>

      <div class="f-w-800 q-ml-sm">
        <small class="f-w-400 text-grey-5">{{ token.profit > 0 ? 'прибыль' : 'убыток' }}: </small>
        <span :class="token.profit > 0 ? 'text-positive' : 'text-negative'">{{ formattedProfit }}</span>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'trader-case-list-item-fixed-token',
  props: {
    token: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    formattedProfit () {
      return this.$numeral(this.token.profit).format('(0,0.00)$').replace('(', '-').replace(')', '')
    }
  }
}
</script>

<style scoped>

</style>
