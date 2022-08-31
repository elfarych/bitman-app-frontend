import Vue from 'vue'
import Vuex from 'vuex'

import chart from './modules/chart'
import wallet from './modules/wallet'
import coins from './modules/coins'
import binanceMarket from './modules/binance-market'
import tickerDetail from './modules/ticker-detail'
import tickers from './modules/tickers'
import trader from './modules/trader'
import info from './modules/info'
import wishlist from './modules/wishlist'
import siteInfo from './modules/siteInfo'
import blog from './modules/blog'
import traderCase from './modules/trader-case'
import news from './modules/news'
import volatility from 'src/store/modules/volatility'
import arbitration from './modules/arbitration'
import events from './modules/events'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      chart,
      wallet,
      trader,
      arbitration,
      coins,
      binanceMarket,
      tickerDetail,
      tickers,
      info,
      wishlist,
      siteInfo,
      blog,
      traderCase,
      news,
      volatility,
      events
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
