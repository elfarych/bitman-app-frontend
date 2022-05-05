<template>
<div class="ticker-detail-cap-info" style="height: 60px">
  <div v-if="tickerCap" class="flex items-center justify-between no-wrap">
    <div>
      <div v-if="tickerCap && tickerCap.marketCap">
        <div class="text-center full-height flex items-center">
          <div class="small-text">Рыночная капитализация:</div>
          <div class="text-uppercase f-w-800 q-ml-sm flex">
            {{ tickerCap.marketCap | tickerVolumeFormatter }}

<!--            <div-->
<!--              v-if="tickerCapUSDInfo.market_cap_change_24h"-->
<!--              :class="tickerCapUSDInfo.market_cap_change_24h > 0 ? 'bg-positive' : 'bg-negative'"-->
<!--              class="rounded-borders q-ml-xs q-px-xs"-->
<!--            >-->
<!--              <span v-if="tickerCapUSDInfo.market_cap_change_24h > 0">+</span>{{ tickerCapUSDInfo.market_cap_change_24h }}%-->
<!--            </div>-->
          </div>

          <div class="f-w-800 q-ml-sm bg-warning q-px-xs rounded-borders text-dark">
            Ранг {{ tickerCap.rank }}
          </div>
        </div>
      </div>

      <div v-if="tickerCap.circulatingSupply">
        <div class="rounded-borders text-center flex items-center q-mt-xs">
          <div class="small-text q-mt-xs">{{ tickerCap.maxSupply ? 'Циркулирующее / максимальное предложение' : 'Циркулирующее предложение' }}
            <span>{{ tickerCap.name }}</span></div>

          <div
            class="relative-position rounded-borders text-uppercase q-mt-xs q-ml-xs"
            :class="tickerCap.maxSupply ? 'bg-grey-7' : ''"
            style="height: 22px; overflow: hidden; width: 250px"
          >
            <div class="orders-len text-subtitle2 f-w-800">
              <div v-if="tickerCap.maxSupply" class="absolute-left bg-positive buys-width-len transition-1" :style="`width: ${circularSupplyWidth}%`"></div>
              <span class="absolute-left q-pl-sm">{{ tickerVolumeFormatter(tickerCap.circulatingSupply) }}</span>
              <span v-if="tickerCap.maxSupply" class="absolute-right q-pr-sm">{{ tickerVolumeFormatter(tickerCap.maxSupply) }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>

  <div v-else>
    <q-skeleton height="20px" width="300px"/>
    <q-skeleton height="20px" width="250px" class="q-mt-sm"/>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import numeral from 'numeral'
import tickerVolumeFormatter from 'src/filters/ticker-volume-formatter'

export default {
  name: 'ticker-detail-cap-info',
  props: {
    price: String
  },
  filters: {
    tickerVolumeFormatter
  },
  computed: {
    ...mapState('tickerDetail', ['tickerCap']),
    circularSupplyWidth () {
      return (this.tickerCap.circulatingSupply * 100 / this.tickerCap.maxSupply).toFixed(2)
    }
  },
  methods: {
    tickerVolumeFormatter (val) {
      return numeral(val).format('(0.00a)').replace('(', '- ').replace(')', '')
    }
  }
}

// CAP INFO
// baseAsset: null
// circulatingSupply: 988661279
// cmcUniqueId: 1765
// dayChange: 3.875459
// dayChangeAmount: 1.74840169
// explorerUrls: null
// fullName: "EOS"
// id: 14465075
// imageUrl: null
// issueDate: null
// issuePrice: null
// issuePriceUsed: null
// localFullName: "EOS"
// logo: "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20201110/09f93059-fe85-42cc-96b7-603ef6da07c6.png"
// mapperName: "EOS"
// marketCap: 2174608613.8259807
// maxSupply: null
// name: "EOS"
// price: 2.19954868
// quoteAsset: null
// rank: 45
// slug: "eos"
// source: null
// symbol: "EOSBUSD"
// tagInfos: [{tag: "pos", display: "POS"}, {tag: "Layer1_Layer2", display: "Layer 1 / Layer 2"}]
// tags: ["pos", "Layer1_Layer2"]
// totalSupply: 1053884985
// tradeUrl: null
// url: null
// volume: 402668470.84317595
// volumeGlobal: null
// website: null
</script>

<style lang="sass">
.ticker-detail-cap-info-card
  background: transparent
  padding: 10px

</style>
