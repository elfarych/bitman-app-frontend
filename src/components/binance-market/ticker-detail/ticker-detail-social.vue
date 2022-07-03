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
        <div v-if="coin" v-html="coin.description.ru" class="ticker-detail-social-description"></div>
        <div v-else>{{ tickerInfo.description }}</div>
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

      <div v-if="coin" class="q-mt-md">
        <div class="row q-col-gutter-md">

          <!--      Development-->
          <div class="col-12 col-sm-6">
            <div class="rounded-borders-xl q-pa-md secondary-border secondary-shadow-inset">
              <div class="f-w-800 text-center">Development</div>
              <div class="q-mt-sm">Stars: <span class="text-uppercase">{{ countFormatter(coin.developer_data.stars) }}</span></div>
              <div class="q-mt-sm">Forks: <span class="text-uppercase">{{ countFormatter(coin.developer_data.forks) }}</span></div>
              <div class="q-mt-sm">Followers: <span class="text-uppercase">{{ countFormatter(coin.developer_data.subscribers) }}</span></div>
              <div class="q-mt-sm">Last month commits: {{ coin.developer_data.commit_count_4_weeks || 'нет данных' }}</div>
              <div class="q-mt-sm">Pull requests: <span class="text-uppercase">{{ countFormatter(coin.developer_data.pull_requests_merged) }}</span></div>
              <div class="q-mt-sm">Tasks (total / completed): {{ coin.developer_data.total_issues || 'нет данных' }} / {{ coin.developer_data.closed_issues || 'нет данных' }}</div>
            </div>
          </div>

          <div class="col-12 col-sm-6">
            <div class="rounded-borders-xl q-pa-md secondary-border secondary-shadow-inset fit">
              <div class="f-w-800 text-center">Community</div>

              <div class="q-mt-sm">Twitter: <span class="text-uppercase">{{ countFormatter(coin.community_data.twitter_followers) }}</span></div>
              <div class="q-mt-sm">Reddit: <span class="text-uppercase">{{ countFormatter(coin.community_data.reddit_subscribers) }}</span></div>
              <div class="q-mt-sm">Telegram: <span class="text-uppercase">{{ countFormatter(coin.community_data.telegram_channel_user_count) }}</span></div>
            </div>
          </div>
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
import bigNumberFormatter from 'src/filters/big-number-formatter'
import numeral from 'numeral'

export default {
  name: 'ticker-detail-social',
  components: {
    twitter
  },
  filters: {
    bigNumberFormatter
  },
  computed: {
    ...mapState('tickerDetail', ['tickerInfo', 'coin'])
  },
  methods: {
    countFormatter (count) {
      return numeral(count).format('(0.00a)').replace('(', '- ').replace(')', '') || 'нет данных'
    }
  },
  mounted () {
    const vm = this
    console.log(vm.tickerInfo)
    setTimeout(() => {
      console.log(vm.tickerInfo)
    }, 3000)
  }
}
</script>

<style lang="sass">
.ticker-detail-social
  background: $dark
  padding: 10px

  .ticker-detail-social-description
    a
      color: $secondary !important
</style>
