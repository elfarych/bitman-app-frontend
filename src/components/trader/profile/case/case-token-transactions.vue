<template>
<div class="case-token-transactions" style="min-height: 152px">
  <div
    v-for="order in orders"
    :key="order.id"
  >
    <case-token-transaction-item :order="order" class="q-mt-sm"/>
    <q-separator class="q-mt-xs"/>
  </div>
</div>
</template>

<script>
import CaseTokenTransactionItem from 'components/trader/profile/case/case-token-transaction-item'

export default {
  name: 'case-token-transactions',
  components: { CaseTokenTransactionItem },
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  },
  computed: {

  }
}
</script>

<style scoped>

</style>
