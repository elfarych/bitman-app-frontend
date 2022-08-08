<template>
  <q-page>

    <portal to="title">
      <base-page-top-title :title="$t('homePage')"/>
    </portal>

    <div class="pages q-pa-sm">

      <div class="row q-col-gutter-sm items-center">

        <!--        Slider-->
        <div class="col-12 col-sm-6">
          <home-slider/>
        </div>

        <!--        Cap-->
        <div class="col-6 col-sm-3 full-height">
          <coins-global-market-cap/>
        </div>

        <!--        Global volume-->
        <div class="col-6 col-sm-3">
          <coins-global-market-volume/>
        </div>
      </div>

      <!--      Market categories-->
      <div>
        <coin-categories/>
      </div>

      <div class="q-mt-xl" style="width: 280px"><airdrop-widget/></div>

      <!--      Top 25-->
      <div v-if="top25Visible" class="q-mt-xl">
        <top25/>
      </div>

<!--      Vix && Buy-long && Top-100 holders-->
      <div v-if="secondBlockVisible" class="q-mt-xl q-pt-lg">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6">

            <!--            Vix chart-->
            <div style="height: 400px">
              <widget-week-vix-chart class="fit" style="min-height: 350px"/>
            </div>

            <!--          Long and short -->
            <div class="q-mt-xl">
              <widget-long-short-positions :diagram-height="150"/>
            </div>
          </div>

<!--          Top 100 holders-->
          <div class="col-12 col-sm-6">
            <top100-wallets/>
          </div>
        </div>
      </div>

      <div class="q-mt-xl q-pt-lg">
        <news-widget v-if="newsBlockVisible"/>
      </div>

    </div>

    <!--    Liders-->
    <div v-if="lidersBlockVisible" class="q-px-sm q-mt-xl">
      <div class="row q-col-gutter-sm">

        <div class="col-12 col-sm-6 q-mt-xl">
          <div class="text-subtitle1 text-uppercase f-w-800">{{ $t('gainers') }}</div>
          <widgets-big-liders-tabs/>
        </div>

        <div class="col-12 col-sm-6 q-mt-xl">
          <div class="text-subtitle1 text-uppercase f-w-800">{{ $t('losers') }}</div>
          <widgets-big-liders-tabs :up="false"/>
        </div>
      </div>
    </div>

    <div v-if="lidersBlockVisible" class="q-mt-xl q-px-sm">
      <widget-liquidity />
    </div>

    <div v-if="lidersBlockVisible" class="q-px-sm q-mt-xl">
      <posts-list top/>
    </div>

    <div v-if="lidersBlockVisible" class="q-mt-xl q-px-sm  q-pt-lg">
      <h3 class="text-h5 f-w-800 text-center">Road map</h3>
      <div class="q-mt-xl">
        <roadmap/>
      </div>
    </div>

  </q-page>
</template>

<script>
import PostsList from 'components/blog/posts-list'
import BasePageTopTitle from 'components/base-page-top-title'
import Roadmap from 'components/roadmap/roadmap'
import WidgetWeekVixChart from 'components/binance-market/widgets/widget-week-vix-chart'
import WidgetLongShortPositions
from 'components/binance-market/widgets/widget-long-short-positions/widget-long-short-positions'
import WidgetLiquidity from 'components/binance-market/widgets/widget-liquidity'
import CoinsGlobalMarketCap from 'components/coins/coins-global-market-cap'
import CoinsGlobalMarketVolume from 'components/coins/coins-global-market-volume'
import CoinCategories from 'components/coins/coin-categories/coins-categories'
import HomeSlider from 'components/sliders/home-slider'
import WidgetsBigLidersTabs from 'components/binance-market/widgets/widgets-big-liders-tabs'
import Top100Wallets from 'components/binance-market/widgets/top-100-wallets/top-100-wallets'
import Top25 from 'components/binance-market/top-25/top-25'
import NewsWidget from 'components/news/news-widget/news-widget'
import AirdropWidget from 'components/swap/airdrop-widget'
// import HomeSwapWrapper from 'components/swap/home-swap-wrapper'

export default {
  name: 'PageIndex',
  components: {
    AirdropWidget,
    // HomeSwapWrapper,
    NewsWidget,
    Top25,
    Top100Wallets,
    WidgetsBigLidersTabs,
    HomeSlider,
    CoinCategories,
    CoinsGlobalMarketVolume,
    CoinsGlobalMarketCap,
    WidgetLiquidity,
    WidgetLongShortPositions,
    WidgetWeekVixChart,
    Roadmap,
    BasePageTopTitle,
    PostsList
  },
  data () {
    return {
      pages: [
        {
          title: 'Как это работает',
          text: 'Видеообзор нашего сервиса',
          routeName: 'Binance-Market'
        },
        {
          title: 'Binance market',
          text: 'Обзор монет биржи Binance',
          routeName: 'Binance-Market'
        },
        {
          title: 'Binance spot volatility',
          text: 'Скринер изменений стоимости монет на спотовом рынке биржи Binance',
          routeName: 'Binance-Vol'
        },
        {
          title: 'Binance futures volatility',
          text: 'Скринер изменений стоимости монет на фьючерсном рынке биржи Binance',
          routeName: 'Binance-Futures-Vol'
        },
        {
          title: 'Gate spot volatility',
          text: 'Скринер изменений стоимости монет на спотовом рынке биржи Gate',
          routeName: 'Gate-Vol'
        },
        {
          title: 'Gate futures volatility',
          text: 'Скринер изменений стоимости монет на фьючерсном рынке биржи Gate',
          routeName: 'Gate-Futures-Vol'
        }
      ],
      top25Visible: false,
      newsBlockVisible: false,
      lidersBlockVisible: false,
      secondBlockVisible: false
    }
  },
  mounted () {
    if (this.$route.query.ref) {
      localStorage.setItem('ref', this.$route.query.ref?.toString())
      this.$router.replace({
        query: {
          ...this.$route.query,
          ref: undefined
        }
      })
    }
    setTimeout(() => {
      this.top25Visible = true
    }, 3000)

    setTimeout(() => {
      this.secondBlockVisible = true
    }, 5000)

    setTimeout(() => {
      this.newsBlockVisible = true
    }, 7000)

    setTimeout(() => {
      this.lidersBlockVisible = true
    }, 9000)
  }
}
</script>

<style lang="sass">
.pages-grid
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 20px

@media screen and (max-width: 700px)
  .pages-grid
    grid-template-columns: 1fr
    grid-gap: 10px
</style>
