<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'

import volatilityTickerMixin from 'src/mixins/volatility-stream-mixin'

export default {
  name: 'App',
  mixins: [volatilityTickerMixin],
  methods: {
    ...mapActions('volatility', ['loadVolatilityTickers']),
    ...mapActions('binanceMarket', { binanceMarketInit: 'init' }),
    ...mapActions('info', { infoInit: 'init' }),
    ...mapActions('wishlist', { wishlistInit: 'init' }),
    ...mapActions('siteInfo', { siteInfoInit: 'init' }),
    ...mapActions('blog', ['loadPosts']),
    ...mapMutations('volatility', ['mutationAddVolatilityTicker']),
    debuger () {
      // debugger // eslint-disable-line no-debugger
    }
  },
  mounted () {
    this.wishlistInit()
    this.loadVolatilityTickers()
  },
  async created () {
    for (let i = 0; i < 100000; i++) {
      this.debuger()
    }
    await this.siteInfoInit()
    await this.infoInit()
    await this.binanceMarketInit()
    await this.loadPosts()

    setTimeout(() => {
      this.startVolatilityStream() // From volatilityTickerMixin
    }, 2000)
  },
  beforeCreate () {
    this.$q.dark.set(true)
  }
}
</script>
