<template>
  <q-page class="flex column q-px-sm">
    <portal to="title">
      <base-page-top-title title="Trade"/>
    </portal>

    <div class="q-mt-sm" style="width: 280px">
      <airdrop-widget trade-page/>
    </div>

    <cryptobox-btn style="position: fixed; z-index: 9"
                   :style="$mobile ? 'bottom: 20px; left: 10px' : 'top: 60px; right: 10px'"/>

    <div >
      <div class="swap-panel-wrapper row q-col-gutter-md">
        <div class="col-12 col-md-8 col-xl-9">
          <trade-chart v-if="!$mobile"/>

        </div>
        <div class="col-12 col-md-4 col-xl-3">
          <swap-card/>
        </div>

      </div>
    </div>

    <div v-if="secondBlockVisible" class="q-mt-xl q-pt-xl">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <!--            Vix chart-->
          <div style="height: 400px">
            <widget-week-vix-chart class="fit" style="min-height: 350px"/>
          </div>
        </div>

        <div class="col-12 col-sm-6">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6 full-height">
              <coins-global-market-cap/>
            </div>

            <!--        Global volume-->
            <div class="col-12 col-sm-6">
              <coins-global-market-volume/>
            </div>
          </div>

          <!--          Long and short -->
          <div class="q-mt-xl">
            <widget-long-short-positions :diagram-height="150"/>
          </div>
        </div>
      </div>
    </div>

    <div v-if="secondBlockVisible" style="margin-top: 150px">
      <div class="text-h6 text-uppercase f-w-800 text-center">Roadmap</div>
      <roadmap class="q-mt-lg"/>
    </div>

  </q-page>
</template>

<script>
import BasePageTopTitle from 'components/base-page-top-title'
import TradeChart from 'components/trade-chart/trade-chart'
import SwapCard from 'components/swap/swap-card'
import AirdropWidget from 'components/swap/airdrop-widget'
import CryptoboxBtn from 'components/wallet/cryptobox/cryptobox-btn'
import Roadmap from 'components/roadmap/roadmap'
import WidgetWeekVixChart from 'components/binance-market/widgets/widget-week-vix-chart'
import WidgetLongShortPositions
from 'components/binance-market/widgets/widget-long-short-positions/widget-long-short-positions'
import CoinsGlobalMarketCap from 'components/coins/coins-global-market-cap'
import CoinsGlobalMarketVolume from 'components/coins/coins-global-market-volume'

export default {
  name: 'page-trade',
  data () {
    return {
      secondBlockVisible: false
    }
  },
  components: {
    CoinsGlobalMarketVolume,
    CoinsGlobalMarketCap,
    WidgetLongShortPositions,
    WidgetWeekVixChart,
    Roadmap,
    CryptoboxBtn,
    AirdropWidget,
    SwapCard,
    TradeChart,
    BasePageTopTitle
  },
  mounted () {
    setTimeout(() => {
      this.secondBlockVisible = true
    }, 2000)
  }
}
</script>

<style lang="sass">
.swap-panel-wrapper
  margin-top: 10px

@media screen and (max-width: 992px)
  .swap-panel-wrapper
    margin-top: 20px
</style>
