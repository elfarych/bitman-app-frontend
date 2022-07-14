<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import volatilityTickerMixin from 'src/mixins/volatility-stream-mixin'
import marketCapGetEndSetter from 'src/utils/market-cap-get-n-setter'

export default {
  name: 'App',
  mixins: [volatilityTickerMixin],
  methods: {
    ...mapActions('binanceMarket', { binanceMarketInit: 'init' }),
    ...mapActions('coins', { coinsInit: 'init' }),
    ...mapActions('info', { infoInit: 'init' }),
    ...mapActions('wishlist', { wishlistInit: 'init' }),
    ...mapActions('siteInfo', { siteInfoInit: 'init' }),
    ...mapActions('blog', ['loadPosts']),
    ...mapActions('trader', ['loadUser']),
    ...mapActions('news', { newsInit: 'init' }),
    ...mapActions('volatility', { volatilityInit: 'init' })
  },
  mounted () {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      this.loadUser()
    }
    this.wishlistInit()
    this.startVolatilityStream()
  },
  created () {
    this.coinsInit()
    marketCapGetEndSetter()
    if (this.$route.query.ref) localStorage.setItem('ref', this.$route.query.ref.toString())
    this.siteInfoInit()
    this.infoInit()
    this.binanceMarketInit()
    this.loadPosts()
    this.newsInit()
    this.volatilityInit()

    setInterval(() => {
      marketCapGetEndSetter()
    }, 60000)
  },
  beforeCreate () {
    this.$q.dark.set(true)
  }
}
</script>

<style lang="sass">
</style>
