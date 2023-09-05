<template>
  <div>
    <q-card
      flat
      class="rounded-borders-xl bg-dark relative-position"
    >
      <q-card-section class="q-pt-md q-px-md q-pb-none">
        <div class="flex items-center">
          <div class="event-card-image rounded-borders-xl" :class="coinLogo ? '' : 'bg-grey-8'">
            <q-img :src="coinLogo" class="event-card-image" contain>
              <template v-slot:loading>
                <q-skeleton class="fit"/>
              </template>
            </q-img>
          </div>

          <div class="q-ml-sm">
            <h2 class="text-subtitle1 f-w-800">{{ event.coin.fullname }}</h2>
            <div>{{ event.title }}</div>
            <div class="q-mt-xs"><q-icon name="event" size="16px" class="q-mr-xs" style="margin-top: -3px"/>{{ $dayjs(event.event_date).format('DD.MM.YYYY') }}</div>
          </div>
        </div>

        <div class="q-py-sm flex justify-end">
          <q-btn
            label="Proof"
            icon="search"
            outline
            no-caps
            dense
            flat
            color="secondary"
            class="q-px-sm rounded-borders-xl"
            @click="dialog = true"
          />

          <q-btn
            label="Coin on Coinmarketcap"
            icon-right="open_in_new"
            outline
            no-caps
            dense
            flat
            color="secondary"
            class="q-px-sm rounded-borders-xl q-ml-md"
            type="a"
            :href="`https://coinmarketcap.com/currencies/${event.coin.coin_id}/`"
            target="_blank"
          />
        </div>
      </q-card-section>

    </q-card>

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
          <q-img :src="event.proof" style="max-height: 90vh" contain/>
        </div>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'event-card',
  props: {
    event: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    coinLogo () {
      return this.event.coin?.image || this.event.proof
    }
  }

  // categories: {id: 1, category_id: 1, name: "Release"}
  // category_id: 1
  // id: 1
  // name: "Release"
  // coin: {id: 4427, coin_id: "planet-sandbox", name: "Planet Sandbox", rank: 0, symbol: "PSB",…}
  // coin_id: "planet-sandbox"
  // fullname: "Planet Sandbox (PSB)"
  // id: 4427
  // image: null
  // name: "Planet Sandbox"
  // rank: 0
  // symbol: "PSB"
  // date: "2022-08-30T12:43:56.982719+06:00"
  // event_date: "2022-09-05T06:00:00+06:00"
  // event_id: 128708
  // id: 65
  // proof: "https://d32bfp67k1q0s7.cloudfront.net/649b191e8e37d5aca69dde6bf276ae6f.png"
  // source: "https://coinmarketcal.com/event/mainnet-launch-128708"
  // text: null
  // tg_sent: true
  // title: "Mainnet Launch"
}
</script>

<style lang="sass">
.event-card-image
  height: 50px
  width: 50px
</style>
