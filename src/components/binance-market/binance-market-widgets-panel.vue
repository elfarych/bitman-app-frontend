<template>
<div class="binance-market-widgets-panel">
  <div>
    <airdrop-widget />
    <arbitration-widget class="q-mt-md"/>
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

  <div class="q-mt-lg">
    <events-banner/>
  </div>

  <div class="q-mt-lg">
    <news-banner/>
  </div>

</div>
</template>

<script>
import WidgetWeekVixChart from 'components/binance-market/widgets/widget-week-vix-chart'
import WidgetLongShortPositions
from 'components/binance-market/widgets/widget-long-short-positions/widget-long-short-positions'
import WidgetLiquidity from 'components/binance-market/widgets/widget-liquidity'
import Top100Wallets from 'components/binance-market/widgets/top-100-wallets/top-100-wallets'
import AirdropWidget from 'components/swap/airdrop-widget'
import ArbitrationWidget from 'components/arbitration/arbitration-widget'
import EventsBanner from 'components/events/events-banner'
import NewsBanner from 'components/news/news-banner'
export default {
  name: 'binance-market-widgets-panel',
  components: {
    NewsBanner,
    EventsBanner,
    ArbitrationWidget,
    AirdropWidget,
    Top100Wallets,
    WidgetLiquidity,
    WidgetLongShortPositions,
    WidgetWeekVixChart
  }
}
</script>

<style lang="sass">

</style>
