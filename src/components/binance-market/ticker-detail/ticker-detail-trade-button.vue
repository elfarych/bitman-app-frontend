<template>
  <div class="ticker-detail-trade-button column fit q-py-sm">
    <airdrop-widget />
    <!--    <div v-if="formattedContracts.length" class="">-->
    <!--      <div class="f-w-800 text-center">-->
    <!--        {{ formattedContracts.length > 1 ? 'Адреса контрактов:' : 'Адрес контракта:' }}-->
    <!--      </div>-->

    <!--      <div class="flex justify-center">-->
    <!--        <q-btn-->
    <!--          v-for="contract in formattedContracts"-->
    <!--          :key="contract.chain"-->
    <!--          icon-right="content_copy"-->
    <!--          :label="contract.chain"-->
    <!--          size="sm"-->
    <!--          color="secondary"-->
    <!--          outline no-caps-->
    <!--          class="q-ml-sm q-mt-sm text-secondary-shadow"-->
    <!--          title="Скопировать адрес"-->
    <!--          @click="copy(contract.address)"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div class="flex items-center q-mt-lg">-->
    <!--      <div class="text-subtitle1 f-w-800 text-uppercase q-ml-xs">Trade on Binance</div>-->
    <!--    </div>-->
    <!--    <div class="flex no-wrap">-->
    <!--        <q-btn-->
    <!--          label="Spot"-->
    <!--          color="warning"-->
    <!--          flat-->
    <!--          size="sm"-->
    <!--          class="rounded-borders f-w-800 q-mt-sm q-px-sm warning-btn"-->
    <!--          type="a"-->
    <!--          target="_blank"-->
    <!--          :href="binanceSpotTradeURI + '?ref=368026154'"-->
    <!--        />-->

    <!--        <q-btn-->
    <!--          v-if="tickerFuturesInfo"-->
    <!--          label="Futures"-->
    <!--          color="warning"-->
    <!--          flat-->
    <!--          class="rounded-borders f-w-800 q-mt-sm q-px-sm q-ml-sm warning-btn"-->
    <!--          type="a"-->
    <!--          size="sm"-->
    <!--          target="_blank"-->
    <!--          :href="binanceFuturesTradeURI + '?ref=368026154'"-->
    <!--        />-->
    <!--    </div>-->

  </div>
</template>

<script>
import config from 'src/config'
import { mapState } from 'vuex'
import { copyToClipboard } from 'quasar'
import notifier from 'src/utils/notifier'
import AirdropWidget from 'components/swap/airdrop-widget'

export default {
  name: 'ticker-detail-trade-button',
  components: { AirdropWidget },
  computed: {
    ...mapState('tickerDetail', ['tickerFuturesInfo', 'tickerInfo']),
    contracts () {
      return this.tickerInfo.contract_address || []
    },
    formattedContracts () {
      return this.contracts.map(item => {
        return {
          chain: item.platform?.name || '',
          address: item.contract_address
        }
      })
    },
    binanceSpotTradeURI () {
      return `${config.binanceTradeURI}/${this.$route.params.symbol}_USDT`
    },
    binanceFuturesTradeURI () {
      return `${config.binanceFuturesTradeURI}/${this.$route.params.symbol}USDT`
    }
  },
  methods: {
    copy (text) {
      copyToClipboard(text)
        .then(() => {
          notifier('Номер кошелька скопирован в буфер.', 'secondary')
        })
        .catch((e) => {
          notifier('Что-то пошло не так.' + e.message)
        })
    }
  }
}
</script>

<style lang="sass">
.ticker-detail-trade-button
  height: 127px

@media screen and (max-width: 700px)
  .ticker-detail-trade-button
    margin-top: 10px
    margin-bottom: 20px
</style>
