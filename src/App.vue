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
    ...mapActions('trader', ['loadUser'])
  },
  mounted () {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      this.loadUser()
    }
    this.wishlistInit()
  },
  async created () {
    await this.coinsInit()
    await marketCapGetEndSetter()
    if (this.$route.query.ref) localStorage.setItem('ref', this.$route.query.ref.toString())
    await this.siteInfoInit()
    await this.infoInit()
    await this.binanceMarketInit()
    await this.loadPosts()

    setInterval(() => {
      marketCapGetEndSetter()
    }, 60000)
  },
  beforeCreate () {
    this.$q.dark.set(true)
  }
}
</script>
