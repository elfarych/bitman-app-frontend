<template>
<div class="top-25">
  <div class="text-h6 text-uppercase f-w-800">{{ $t('top25') }}</div>
  <div>
    <top25-slider />
  </div>
  <q-btn
    :label="$t('binanceMarketsSee')"
    color="warning"
    unelevated flat
    class="q-mt-lg f-w-800 q-pa-xs warning-btn"
    :to="{ name: 'Binance-Market' }"
  />
</div>
</template>

<script>
import Top25Slider from 'components/binance-market/top-25/top-25-slider'
export default {
  name: 'top-25',
  components: { Top25Slider }
}
</script>

<style scoped>

</style>
