<template>
  <div class="swap-card bg-dark secondary-shadow-inset secondary-border q-px-lg">
    <div v-if="$mobile" class="absolute-top-left q-pa-md">
      <q-btn
        dense
        flat
        round
        :icon="chartMode ? 'close' : 'bar_chart'"
        @click="chartMode = !chartMode"
      />
    </div>
    <div class="absolute-top-right q-pa-md">

      <q-slide-transition transition-show="">
        <q-btn
          v-if="!settingsMode"
          icon="history"
          dense
          flat
          round
          class="q-mr-xs"
          @click="showHistory"
        />
      </q-slide-transition>

      <q-btn
        dense
        flat
        round
        :icon="settingsMode ? 'close' : 'settings'"
        @click="settingsMode = !settingsMode"
      />
    </div>

    <div>
      <div class="text-center f-w-800 q-mt-md text-h5">
        {{ settingsMode ? 'Settings' : chartMode ? 'DOGS' : 'Swap' }}
      </div>
    </div>

    <div v-show="settingsMode">
      <swap-settings/>
    </div>

    <div v-show="!settingsMode && !chartMode" class="q-mt-xl">
      <swap-coins/>
    </div>

    <div v-if="chartMode">
      <mobile-chart />
    </div>

  </div>
</template>

<script>
import SwapSettings from 'components/swap/swap-settings'
import { mapState } from 'vuex'
import notifier from 'src/utils/notifier'
import SwapCoins from 'components/swap/swap-coins'
import MobileChart from 'components/trade-chart/trade-mobile-chart'

export default {
  name: 'swap-card',
  components: { MobileChart, SwapCoins, SwapSettings },
  computed: {
    ...mapState('wallet', ['wallet'])
  },
  data () {
    return {
      settingsMode: false,
      chartMode: false
    }
  },
  methods: {
    showHistory () {
      if (this.wallet.address) {
        return notifier('No transactions history.')
      }
      return notifier('Connect wallet first.')
    }
  }
}
</script>

<style lang="sass">
.swap-card
  height: 530px
  width: 100%
  border-radius: 25px
  position: relative
</style>
