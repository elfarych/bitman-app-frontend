<template>
  <q-page class="q-pa-sm">

    <portal to="top-bar-right">
      <div class="flex">
        <mobile-chart-popup-btn :symbol="$route.params.symbol"/>
        <wishlist-btn :symbol="$route.params.symbol"/>
      </div>

    </portal>

    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-8">
        <!--  Main info card-->
        <ticker-main-info/>
      </div>
      <div class="col-12 col-md-4">
        <ticker-detail-trade-button/>
      </div>
    </div>

    <!--    Chart & Limit orders-->
    <div v-show="!ordersChartMode" class="q-mt-sm">
      <div class="row q-col-gutter-sm">

        <!--      Chart-->
        <div class="col-sm-7 col-md-8 col-12 ticker-detail-chart">
          <ticker-detail-chart class="q-pl-sm"/>
        </div>

        <!--      Orders-->
        <div class="col-sm-5 col-md-4 col-12 full-height">
          <ticker-detail-orders/>
        </div>
      </div>
    </div>

<!--    Orders chart-->
    <div v-show="ordersChartMode">
      <ticker-detail-orders-chart class="q-mt-sm"/>
    </div>
    <!--    Trades Difference-->

    <div class="q-mt-sm">
      <div class="row q-col-gutter-sm">
        <!--    limit orders Difference-->
        <div class="col-12 col-sm-6 col-md-3">
          <ticker-detail-limit-orders-difference />
        </div>

        <!--    limit Futures orders Difference-->
        <div class="col-12 col-sm-6 col-md-3">
          <ticker-detail-limit-orders-difference futures/>
        </div>

        <!--    recent orders Difference-->
        <div class="col-12 col-sm-6 col-md-3">
          <ticker-detail-recent-orders-difference />
        </div>

        <!--    recent futures orders Difference-->
        <div class="col-12 col-sm-6 col-md-3">
          <ticker-detail-recent-orders-difference futures/>
        </div>

        <div class="col-12 col-md-6 row">
          <!--    Liquidity-->
          <div class="col-12 col-md-6">
            <ticker-detail-liquidity />
          </div>

          <!--    Open interest-->
          <div class="col-12 col-sm-6">
            <ticker-detail-open-interest />
          </div>

          <!--        Cash flow-->
          <div class="col-12">
            <ticker-detail-cash-flow />
          </div>
        </div>

<!--        Hodlers-->
        <div class="col-12 col-md-6">
          <ticker-detail-hodlers />
          </div>

<!--        Social info-->
        <div class="col-12 q-mt-lg">
          <ticker-detail-social />
          </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TickerMainInfo from 'components/binance-market/ticker-detail/ticker-main-info'
import TickerDetailChart from 'components/binance-market/ticker-detail/ticker-detail-chart'
import TickerDetailOrders from 'components/binance-market/ticker-detail/ticker-detail-orders'
import TickerDetailTradeButton from 'components/binance-market/ticker-detail/ticker-detail-trade-button'
import TickerDetailLimitOrdersDifference from 'components/binance-market/ticker-detail/ticker-detail-limit-orders-difference'
import TickerDetailRecentOrdersDifference from 'components/binance-market/ticker-detail/ticker-detail-recent-orders-difference'
import TickerDetailLiquidity from 'components/binance-market/ticker-detail/ticker-detail-liquidity'
import TickerDetailOpenInterest from 'components/binance-market/ticker-detail/ticker-detail-open-interest'
import TickerDetailCashFlow from 'components/binance-market/ticker-detail/ticker-detail-cash-flow'
import TickerDetailHodlers from 'components/binance-market/ticker-detail/ticker-detail-hodlers'
import TickerDetailSocial from 'components/binance-market/ticker-detail/ticker-detail-social'
import WishlistBtn from 'components/wishlist/wishlist-btn'
import MobileChartPopupBtn from 'components/chart/mobile-chart-popup-btn'
import TickerDetailOrdersChart from 'components/binance-market/ticker-detail/ticker-detail-orders-chart'

export default {
  name: 'page-ticker-detail',
  components: {
    TickerDetailOrdersChart,
    MobileChartPopupBtn,
    WishlistBtn,
    TickerDetailSocial,
    TickerDetailHodlers,
    TickerDetailCashFlow,
    TickerDetailOpenInterest,
    TickerDetailLiquidity,
    TickerDetailRecentOrdersDifference,
    TickerDetailLimitOrdersDifference,
    TickerDetailTradeButton,
    TickerDetailOrders,
    TickerDetailChart,
    TickerMainInfo
  },
  methods: {
    ...mapActions('tickerDetail', ['init'])
  },
  created () {
    this.init()
  },
  computed: {
    ...mapState('tickerDetail', ['tickerFuturesInfo']),
    symbol () {
      return this.$route.params.symbol
    },
    ordersChartMode () {
      return this.$route.query.chartMode && this.$route.query.chartMode.toString() === 'orders'
    }
  },
  watch: {
    '$route.params.symbol' () {
      this.init()
    }
  }
}
</script>

<style lang="sass">
.mobile-chart
  width: 100%
  min-height: 150px
  //border-radius: 15px
  padding: 20px
  background: #131722

@media screen and (max-width: 700px)
  .ticker-detail-chart
    display: none
</style>
