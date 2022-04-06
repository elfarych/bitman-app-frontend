<template>
<q-page :class="$mobile ? 'q-pa-sm' : 'q-pa-md'">
  <portal to="title">
    <base-page-top-title title="Рынок"/>
  </portal>
  <binance-market />
</q-page>
</template>

<script>
import BasePageTopTitle from 'components/base-page-top-title'
import BinanceMarket from 'components/binance-market/binance-market'

export default {
  name: 'page-binance-market',
  components: { BinanceMarket, BasePageTopTitle }
}
</script>

<style scoped>

</style>
