<template>
  <div ref="tradingview" :id="container" class="tradingview-widget-container">
<!--    <div class="tradingview-widget-container__widget"></div>-->
  </div>
</template>

<script>
const SCRIPT_ID = 'tradingview-widget-script'
const CONTAINER_ID = 'tradingview-widget-container'

export default {
  name: 'ticker-detail-ideas',
  data () {
    return {
      container: CONTAINER_ID
    }
  },
  props: {
    options: {
      type: Object,
      default: () => ({
        container_id: CONTAINER_ID,
        startingCount: 1,
        width: '350px',
        height: 400,
        mode: 'integrate',
        bgColor: 'rgba(66, 66, 66, 1)',
        headerColor: 'rgba(0, 0, 0, 1)',
        borderColor: 'rgba(101, 101, 101, 1)',
        locale: 'en',
        sort: 'recent',
        stream: 'bitcoin',
        symbol: 'BINANCE:APEUSDT'
      })
    }
  },
  methods: {
    canUseDOM () {
      return typeof window !== 'undefined' && window.document && window.document.createElement
    },
    getScriptElement () {
      return document.getElementById(SCRIPT_ID)
    },
    updateOnloadListener (onload) {
      const script = this.getScriptElement()
      const oldOnload = script.onload
      // eslint-disable-next-line no-return-assign
      return script.onload = () => {
        oldOnload()
        onload()
      }
    },
    scriptExists () {
      return this.getScriptElement() !== null
    },
    appendScript (onload) {
      if (!this.canUseDOM()) {
        onload()
        return
      }

      if (this.scriptExists()) {
        if (typeof TradingView === 'undefined') {
          this.updateOnloadListener(onload)
          return
        }
        onload()
        return
      }
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://s3.tradingview.com/tv.js'
      script.onload = onload
      script.textContent = JSON.stringify(this.options)

      this.$refs.tradingview.appendChild(script)
    },
    initWidget () {
      console.log('[widget-forex-cross-rages] loaded')
    }
  },
  mounted () {
    setTimeout(() => {
      this.appendScript(this.initWidget)
    }, 300)
  }
}
</script>

<style scoped>

</style>
