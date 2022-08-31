<template>
  <q-item
    class="q-pa-md rounded-borders-xl column full-width bg-warning text-dark relative-position"
    clickable
    @click="swapBtnHandler"
  >
    <div class="text-h5 f-w-800 text-uppercase tex"><q-icon name="crisis_alert" size="25px" style="margin-top: -5px"/> {{ $t('airdropWidgetTitle') }}</div>
    <div>{{ $t('airdropWidgetText') }} <span class="f-w-800">3500 DOGS</span></div>
  </q-item>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import onboard from 'components/wallet/wallet-connect/onboard-connect'

export default {
  name: 'airdrop-widget',
  props: {
    tradePage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('wallet', ['wallet'])
  },
  methods: {
    ...mapActions('wallet', ['setWallet', 'swapMyToken', 'dogsAirdrop']),
    swapBtnHandler () {
      if (!this.tradePage) {
        return this.$router.push({ name: 'trade' })
      }
      if (this.dogsBalance !== null && this.dogsBalance < 1) {
        this.loading = true
        this.dogsAirdrop().then(() => { this.loading = false })
      }
      if (!this.wallet.address) {
        this.connectWallet()
      }
    },
    connectWallet () {
      onboard.connectWallet().then(async (wallet) => {
        if (wallet && wallet.length) {
          await this.setWallet(wallet)
        } else {
          this.dialog = true
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
