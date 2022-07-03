<template>
  <div class="swap bg-dark rounded-borders-xl secondary-shadow-inset secondary-border"
       :style="miniMode ? 'width: 100%' : ''">

    <div class="home-swap-left-block-title-2 f-w-800 text-uppercase">
      <span class="text-secondary text-secondary-shadow">BTMT</span> token airdrop
    </div>

    <div class="text-primary text-subtitle1 f-w-600">
      {{ $t('takeAirdropText') }} <span class="text-secondary f-w-800 text-secondary-shadow">1950 BTMT</span>
    </div>

    <q-slide-transition>
      <div v-if="showSwapInputs" class="q-mt-lg relative-position">

        <small
          v-if="wallet.address"
          class="absolute-top-right"
          :class="wallet.btmtBalance ? 'text-primary' : ''"
          style="top: -20px"
        >
          {{ $t('youHave') + ' ' + formattedBalance + ' BTMT' }}
        </small>

        <q-input
          label="BTMT"
          v-model="btmtQty"
          outlined
          type="number"
          input-class="f-w-800"
          input-style="font-size: 30px"
        >
          <template v-slot:prepend>
            <div>
              <q-img :src="btmtImage"/>
            </div>
          </template>

          <template v-slot:append>
            <q-btn
              label="max"
              class="f-w-800"
              @click="setMaxBtmtQty"
            />
          </template>
        </q-input>
      </div>
    </q-slide-transition>

    <q-slide-transition>
      <div v-if="showSwapInputs" class="text-center q-py-sm">
        <q-icon
          name="swap_vert"
          size="20px"
          class="text-secondary-shadow text-secondary"
        />
      </div>
    </q-slide-transition>

    <q-slide-transition>
      <div v-if="showSwapInputs">
        <q-input
          label="BUSD"
          v-model="busdQty"
          type="number"
          outlined
          input-class="f-w-800"
          input-style="font-size: 30px"
        >
          <template v-slot:prepend>
            <div>
              <q-img :src="btmtImage"/>
            </div>
          </template>

        </q-input>
      </div>
    </q-slide-transition>

    <div class="text-center">
      <wallet-connect-button v-if="!wallet.address || wallet.btmtBalance === null"/>

      <div v-if="wallet.address && wallet.chainId !== '0x38'" class="text-subtitle1 f-w-800 text-negative q-mt-md">
        {{ $t('onlyBSC') }}
      </div>

      <get-airdrop-btn v-if="wallet.chainId === '0x38' && wallet.btmtBalance !== null && !wallet.btmtBalance"/>

      <swap-button v-if="wallet.chainId === '0x38' && wallet.btmtBalance"/>

    </div>

  </div>
</template>

<script>
import btmtImage from 'src/assets/coin.svg'
import WalletConnectButton from 'components/wallet/wallet-connect-button'
import { mapState } from 'vuex'
import GetAirdropBtn from 'components/wallet/get-airdrop-btn'
import SwapButton from 'components/wallet/swap-button'

export default {
  name: 'swap',
  components: { SwapButton, GetAirdropBtn, WalletConnectButton },
  props: {
    miniMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      btmtQty: 0,
      busdQty: 0
    }
  },
  computed: {
    ...mapState('wallet', ['wallet']),
    showSwapInputs () {
      if (this.miniMode) {
        return !!this.wallet.address
      }
      return true
    },
    btmtImage () {
      return btmtImage
    },
    btmtBalance () {
      return this.wallet.btmtBalance
    },
    formattedBalance () {
      if (this.wallet.btmtBalance) {
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2
        }).format(this.wallet.btmtBalance)
      }
      return 0
    }
  },
  methods: {
    setMaxBtmtQty () {
      this.btmtQty = this.wallet.btmtBalance
    }
  },
  created () {
    this.btmtQty = 1000
    this.busdQty = (this.btmtQty * 0.03).toFixed(2)
  },
  watch: {
    btmtQty (val) {
      if (val < 0) {
        val = Math.abs(val)
        this.btmtQty = val
      }
      this.busdQty = (val * 0.03).toFixed(2)
    },
    busdQty (val) {
      if (val < 0) val = Math.abs(val)
      this.busdQty = val
      this.btmtQty = (val / 0.03).toFixed(2)
    },
    btmtBalance (val) {
      if (val) this.setMaxBtmtQty()
    }
  }
}
</script>

<style lang="sass">
.swap
  padding: 20px 20px
  width: 550px
  max-width: 100%
</style>
