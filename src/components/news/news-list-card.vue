<template>
<div class="news-list-card relative-position">
  <div class="flex items-center no-wrap">
    <div class="news-list-card-image relative-position">
      <q-img :src="post.image" class="news-list-card-image">
        <template v-slot:loading>
          <q-skeleton class="fit"/>
        </template>
      </q-img>
      <q-btn
        icon-right="search"
        size="sm"
        color="dark"
        dense
        class="absolute-bottom-right q-ma-xs"
        style="z-index: 100"
        @click="dialog = true"
      />
    </div>

    <div class="q-ml-sm">
      <h2 class="text-subtitle2 f-w-800 ellipsis-3-lines">{{ post.title }}</h2>
      <p class="ellipsis-3-lines">{{ post.text }}</p>
    </div>
  </div>

  <div class="flex justify-between items-center">
    <div class="text-secondary-shadow text-secondary f-w-800 q-mt-sm">{{ tickers }}</div>
    <div class="text-right q-mt-sm">
      <q-btn
        :label="post.source_name"
        no-caps unelevated dense flat
        color="secondary"
        icon="open_in_new"
        class="rounded-borders-xl q-px-sm"
        type="a"
        :href="post.source_url"
      />
    </div>
  </div>

  <q-dialog v-model="dialog" maximized>
    <q-card style="width: 100%; background: rgba(0,0,0,.8)">
      <div class="text-right q-pa-md">
        <q-btn
          icon-right="close"
          label="Close"
          color="secondary"
          class="f-w-800"
          no-caps
          v-close-popup
        />
      </div>

      <div style="max-height: 80vh">
        <q-img :src="post.image" style="max-height: 90vh" contain/>
      </div>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
export default {
  name: 'news-list-card',
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    tickers () {
      return this.post.tickers.replaceAll('#', '$')
    }
  },
  data () {
    return {
      dialog: false
    }
  }

  // date: "2022-08-31T13:34:31.099943+06:00"
  // id: 542
  // image: "https://crypto.snapi.dev/images/v1/q/t/bic-btc-price-floor-drop-188450.png"
  // post_date: "Wed, 31 Aug 2022 03:30:00 -0400"
  // sentiment: "Neutral"
  // source_name: "BeInCrypto"
  // source_url: "https://beincrypto.com/bitcoin-btc-potentially-targetting-test-resistance-near-22000/"
  // text: "Bitcoin is making another attempt at breaking out above a descending resistance line. If successful, it could increase towards $22,000."
  // tg_sent: true
  // tickers: "#BTC "
  // title: "Bitcoin (BTC) Potentially Targetting a Test of Resistance Near $22,000"
}
</script>

<style lang="sass">
.news-list-card
  border-radius: 8px
  padding: 10px
  margin-top: 10px
  background: $dark

.news-list-card-image
  width: 100px
  height: 100px
  border-radius: 8px
</style>
