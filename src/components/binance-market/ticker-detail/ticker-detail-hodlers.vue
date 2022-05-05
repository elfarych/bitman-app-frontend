<template>
  <div class="ticker-detail-hodlers rounded-borders">
    <div>
      <div class="f-w-800 text-uppercase q-mt-lg text-subtitle1 flex justify-between items-center">
        <span class="block">ТОП-100 ходлеров</span>
        <q-btn
          icon="refresh"
          flat dense
          color="secondary"
          class="q-ml-sm"
          :disable="disableLoader"
          @click="reloadHodlers"
        />
      </div>
      <div v-if="hodlers && hodlers.length">
        <!--      Header-->
        <div class="row q-mt-md items-center f-w-600">
          <div class="col-3">
            № / %
          </div>
          <div class="col-3 text-left">
            Кол-во {{ tokenName }}
          </div>
          <div class="col-3 q-pl-sm">
            Изм. 1 / 7 дней
          </div>
          <div class="col-3 text-center">
            Адрес
          </div>
        </div>

        <!--      Body-->
        <q-scroll-area style="height: 577px" class="q-pt-md" :thumb-style="thumbStyle" visible>
          <div
            v-for="hodler in hodlers"
            :key="hodler.rating"
            class="q-mt-xs"
          >
            <div class="row items-center">
              <!--          Рейтинг-->
              <div class="col-3">
                {{ hodler.rating }} / {{ hodler.percent.toFixed(2) }}
              </div>

              <!--          Количество монет-->
              <div class="col-3 f-w-800 text-uppercase">
                {{ hodler.tokens | tokenQuantityFormatter }}
                <small class="f-w-600 block small-text">{{ getUsdtSum(hodler.tokens) }}</small>
              </div>

              <!--          Изменеие за сутки-->
              <div class="col-3 f-w-800 q-pl-sm text-left text-uppercase l-h-12">
                <div v-if="hodler.oneDayChange" :class="hodler.oneDayChange > 0 ? 'text-positive' : 'text-negative'">
                  {{ hodler.oneDayChange > 0 ? '+' : '' }}{{ hodler.oneDayChange | tokenQuantityFormatter }}
                  <small class="f-w-600 small-text l-h-12">{{ getUsdtSum(hodler.oneDayChange) }}</small>
                </div>
                <div v-else>-</div>

                <!--            Изменение за неделю-->
                <div v-if="hodler.weeklyChange" :class="hodler.weeklyChange > 0 ? 'text-positive' : 'text-negative'">
                  {{ hodler.weeklyChange > 0 ? '+' : '' }}{{ hodler.weeklyChange | tokenQuantityFormatter }}
                  <small class="f-w-600 small-text l-h-12">
                    {{ getUsdtSum(hodler.weeklyChange) }}</small>
                </div>
                <div v-else>-</div>
              </div>
              <div class="col-3 f-w-300  text-center q-pl-md" style="cursor: pointer">
                <q-btn
                  icon="content_copy"
                  class=""
                  flat size="sm"
                  @click="copy(hodler.address)"
                >
                  <q-tooltip>Коопировать адрес</q-tooltip>
                </q-btn>

              </div>
            </div>
            <q-separator class="q-mt-sm"/>
          </div>
        </q-scroll-area>

        <!--      Footer-->
        <div>
          <div class="row q-mt-md bg-dark q-pa-sm rounded-borders">
            <div class="col-12 col-sm-6">
              <div class="f-w-800">Итого за день:
                <span
                  class="text-uppercase"
                  :class="dailySummary > 0 ? 'text-positive' : 'text-negative'">
              {{ dailySummary > 0 ? '+' : '' }}{{ dailySummary | tokenQuantityFormatter }}
              <small class="f-w-600 small-text l-h-12">{{ getUsdtSum(dailySummary) }}</small>
            </span>
              </div>
            </div>

            <div class="col-12 col-sm-6 ">
              <div class="f-w-800">За неделю:
                <span
                  class="text-uppercase"
                  :class="weeklySummary > 0 ? 'text-positive' : 'text-negative'">
              {{ weeklySummary > 0 ? '+' : '' }}{{ weeklySummary | tokenQuantityFormatter }}
              <small class="f-w-600 small-text l-h-12">{{ getUsdtSum(weeklySummary) }}</small>
            </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div v-else class="text-h5 text-grey fit flex flex-center f-w-800 q-py-xl">
        <div>Нет данных</div>
      </div>

    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import tokenQuantityFormatter from 'src/filters/token-quantity-formatter'
import { copyToClipboard } from 'quasar'
import notifier from 'src/utils/notifier'

export default {
  name: 'ticker-detail-hodlers',
  computed: {
    ...mapState('info', ['hodlers']),
    ...mapState('tickerDetail', ['ticker']),
    tokenName () {
      return this.$route.params.symbol
    },
    dailySummary () {
      let sum = 0
      this.hodlers.forEach(item => {
        sum += item.oneDayChange
      })
      return sum
    },

    weeklySummary () {
      let sum = 0
      this.hodlers.forEach(item => {
        sum += item.weeklyChange
      })
      return sum
    }

    // sellsOneDaySummary () {
    //
    // }
  },
  filters: {
    tokenQuantityFormatter
  },
  methods: {
    ...mapActions('info', ['loadHodlers']),
    copy (text) {
      copyToClipboard(text)
        .then(() => {
          notifier('Номер кошелька скопирован в буфер.')
        })
        .catch((e) => {
          notifier('Что-то пошло не так.' + e.message)
        })
    },
    getUsdtSum (tokens) {
      return this.$numeral(parseFloat(tokens) * parseFloat(this.ticker.c)).format('($0.00a)').replace('(', '').replace(')', '')
    },
    async reloadHodlers () {
      this.disableLoader = true
      await this.loadHodlers()

      setTimeout(() => {
        this.disableLoader = false
      }, 10000)
    }
  },
  mounted () {
    setTimeout(() => {
      this.loadHodlers()
    }, 3500)
  },
  watch: {
    '$route.params.symbol' () {
      this.loadHodlers()
    }
  },
  data () {
    return {
      disableLoader: false,
      thumbStyle: {
        right: '1px',
        borderRadius: '5px',
        width: '3px',
        opacity: 0.2
      }
    }
  }
}
</script>

<style lang="sass">
.ticker-detail-hodlers
  //background: $dark
  padding: 10px
</style>
