<template>
<div class="wallet-connect-button">
  <q-btn
    :label="$t('connectWallet')"
    class="f-w-800 q-mt-lg q-pa-sm rounded-borders-xl full-width"
    no-caps
    style="font-size: 18px"
    color="primary"
    text-color="dark"
    icon-right="account_balance_wallet"
    unelevated
    :loading="swapLoading"
    @click="connectWallet"
  />
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'wallet-connect-button',
  computed: {
    ...mapState('wallet', ['swapLoading'])
  },
  methods: {
    ...mapActions('wallet', ['connectWallet'])
  }
}
</script>

<style scoped>

</style>
