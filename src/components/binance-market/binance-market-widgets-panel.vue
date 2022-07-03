<template>
<div class="binance-market-widgets-panel">
  <div>
    <swap mini-mode/>
  </div>
  <div class="q-mt-md">
    <top100-wallets />
  </div>

  <div class="q-mt-lg">
    <widget-week-vix-chart :key="`${$route.query.market}`" style="min-height: 350px"/>
  </div>
  <div class="q-mt-lg">
    <widget-long-short-positions :key="`${$route.query.market}`"/>
  </div>

  <div class="q-mt-lg">
    <widget-liquidity :key="`${$route.query.market}`"/>
  </div>

</div>
</template>

<script>
import WidgetWeekVixChart from 'components/binance-market/widgets/widget-week-vix-chart'
import WidgetLongShortPositions
from 'components/binance-market/widgets/widget-long-short-positions/widget-long-short-positions'
import WidgetLiquidity from 'components/binance-market/widgets/widget-liquidity'
import Top100Wallets from 'components/binance-market/widgets/top-100-wallets/top-100-wallets'
import Swap from 'components/swap/swap'
export default {
  name: 'binance-market-widgets-panel',
  components: { Swap, Top100Wallets, WidgetLiquidity, WidgetLongShortPositions, WidgetWeekVixChart }
}
</script>

<style lang="sass">

</style>
