<template>
<div class="top-25">
  <div class="text-subtitle1 text-uppercase f-w-800">Топ 25</div>
  <div>
    <top25-slider />
  </div>
  <q-btn
    label="Обзор рынка Binance"
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
