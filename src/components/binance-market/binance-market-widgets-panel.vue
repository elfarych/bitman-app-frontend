<template>
<div class="binance-market-widgets-panel">
  <div class="market-right-panel">
    <widget-week-vix-chart :key="`${$route.query.market}`"/>
  </div>
  <div class="q-mt-sm">
    <widget-long-short-positions :key="`${$route.query.market}`"/>
  </div>

  <div class="q-mt-sm">
    <widget-liquidity :key="`${$route.query.market}`"/>
  </div>

  <div class="q-mt-sm">
    <widget-week-top-coins :key="`${$route.query.market}`"/>
  </div>
</div>
</template>

<script>
import WidgetWeekVixChart from 'components/binance-market/widgets/widget-week-vix-chart'
import WidgetLongShortPositions
from 'components/binance-market/widgets/widget-long-short-positions/widget-long-short-positions'
import WidgetWeekTopCoins from 'components/coins/widget-week-top-coins/widget-week-top-coins'
import WidgetLiquidity from 'components/binance-market/widgets/widget-liquidity'
export default {
  name: 'binance-market-widgets-panel',
  components: { WidgetLiquidity, WidgetWeekTopCoins, WidgetLongShortPositions, WidgetWeekVixChart }
}
</script>

<style lang="sass">

</style>
