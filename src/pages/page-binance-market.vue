<template>
<q-page :class="$mobile ? 'q-pa-sm' : 'q-pa-md'">
  <binance-market />
</q-page>
</template>

<script>
import BinanceMarket from 'components/binance-market/binance-market'

export default {
  name: 'page-binance-market',
  components: { BinanceMarket }
}
</script>

<style scoped>

</style>
