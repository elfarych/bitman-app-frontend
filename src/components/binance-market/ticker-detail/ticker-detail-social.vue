<template>
<div class="ticker-detail-social fit rounded-borders">

  <div v-if="tickerInfo.name" class="row q-col-gutter-md">
    <div class="col-sm-6 col-12">

<!--      Name & Logo-->
      <div class="flex items-center no-wrap">
        <q-avatar :size="$mobile ? '40px' : '40px'" class=" bg-transparent" square>
          <q-img
            v-if="tickerInfo.logo"
            :src="tickerInfo.logo"
            contain
            class="rounded-borders"
            img-class="white-shadow"
          >
            <template v-slot:loading>
              <q-skeleton class="fit"/>
            </template>
          </q-img>
        </q-avatar>
        <div class="text-h5 f-w-800 q-ml-sm">{{ tickerInfo.name }}</div>
      </div>

<!--      Description-->
      <div class="q-pa-md">
        {{ tickerInfo.description }}
      </div>

      <div class="q-pa-md flex">
        <div
          v-for="(url, key) in tickerInfo.urls"
          :key="key"
        >
            <q-btn
              v-if="url[0]"
              :label="key"
              type="a"
              :href="`${url[0]}`"
              target="_blank"
              class="q-ma-xs f-w-600 rounded-borders"
              text-color="dark"
              color="primary"
              no-caps unelevated
            />
        </div>
      </div>
    </div>

<!--    Twitter-->
    <div class="col-sm-6 col-12">
      <q-scroll-area style="height: 700px">
        <div v-if="tickerInfo.twitter_username" class="timeline">
          <twitter>
            <div slot="loading">loading .....</div>
            <a class="twitter-timeline"
               data-theme="dark"
               :href="`https://twitter.com/${tickerInfo.twitter_username}?ref_src=twsrc%5Etfw`"
            >Tweets by {{ tickerInfo.twitter_username }}</a>
          </twitter>
        </div>
      </q-scroll-area>
    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import { twitter } from 'vue-twitter'
export default {
  name: 'ticker-detail-social',
  components: {
    twitter
  },
  computed: {
    ...mapState('tickerDetail', ['tickerInfo'])
  }
}
</script>

<style lang="sass">
.ticker-detail-social
  background: $dark
  padding: 10px
</style>
