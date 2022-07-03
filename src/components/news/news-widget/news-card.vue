<template>
<q-item
  class="news-card rounded-borders-xl  q-pa-md bg-dark column relative-position secondary-shadow-inset secondary-border"
  :title="news.caption"
>

<!--  Price change-->
  <div
    v-if="priceChangePercentage"
    class="absolute-top-right q-pa-sm f-w-800"
    :class="priceChangePercentage > 0 ? 'text-positive' : 'text-negative'"
  >
    <span v-if="priceChangePercentage > 0">+</span>{{ priceChangePercentage }}%
  </div>

<!--  Hot-->
  <div
    v-if="news.important === 'true'"
    class="absolute-top-left q-pa-sm f-w-800"
  >
    <q-icon name="local_fire_department" color="negative" size="30px" class="text-white-shadow-light"/>
  </div>

  <div class="text-center">
    <q-avatar :size="$mobile ? '30px' : '50px'" class="bg-transparent" square>
      <q-img
        v-if="news.coin"
        :src="news.coin.image_64 || news.coin.image_32"
        contain
        class="rounded-borders"
        img-class="white-shadow"
      >
        <template v-slot:loading>
          <q-skeleton class="fit"/>
        </template>
      </q-img>
    </q-avatar>

    <div class="q-mt-sm">
      <div class="f-w-800 text-secondary text-secondary-shadow">{{ news.coin.name }}</div>
      <div class="text-grey-5 small-text">{{ news.coin.symbol }}</div>

      <div class="q-mt-xs ellipsis-2-lines">
        {{ news.caption }}
      </div>

    </div>

<!--    Date-->
    <div class="small-text absolute-bottom-right full-width q-pa-sm">

      <div class="q-mt-sm">
        <div class="row q-col-gutter-xs ">
          <div class="col-6">
            <q-btn
              label="Source"
              no-caps outline flat
              class="l-h-12 fit"
              color="warning"
              type="a"
              target="_blank"
              :href="news.source"
            />
          </div>

          <div class="col-6">
            <q-btn
              label="Coin"
              no-caps flat
              class="l-h-12 fit"
              outline
              color="warning"
              type="a"
              target="_blank"
              :href="coinMarketcapLink"
            />
          </div>
        </div>
      </div>

      <div class="col-12 text-right q-mt-md text-grey-5"><q-icon name="event" size="18px" style="margin-top: -3px; margin-right: 5px"/>{{ dateFormat }}</div>
    </div>

  </div>

</q-item>
</template>

<script>
export default {
  name: 'news-card',
  props: {
    news: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    priceChangePercentage () {
      return parseFloat(this.news.coin_price_changes)
    },
    dateFormat () {
      if (this.news.date_start.includes(' ')) return this.news.date_start + ' UTC'
      return this.news.date_start
    },
    coinMarketcapLink () {
      let slug
      if (this.news.coin.image_32) {
        const coinImageNameArr = this.news.coin.image_32.split('/')
        slug = coinImageNameArr[coinImageNameArr.length - 2]
      } else slug = this.news.coin.name.toLowerCase().replace(' ', '-').replace('.', '-')
      return `https://www.coingecko.com/en/coins/${slug}`
    }
  }
}

// DATA EXAMPLE
// caption: "Выпуск PIVX Core Wallet 3.0.0"
// coin: Object
//   id: "44"
//   image_32: "https://coindar.org/images/coins/pivx/32x32.png"
//   image_64: "https://coindar.org/images/coins/pivx/64x64.png"
//   name: "PIVX"
//   symbol: "PIVX"
//
// coin_id: "44"
// coin_price_changes: "-99.50"
// date_end: ""
// date_public: "2017-10-10 03:41"
// date_start: "2017-10-06"
// important: "false"
// source: "https://coindar.org/ru/event/pivx-pivx-vypusk-pivx-core-wallet-300-2"
// source_reliable: "false"
// tags: "15"
</script>

<style lang="sass">
.news-card
  height: 230px
</style>
