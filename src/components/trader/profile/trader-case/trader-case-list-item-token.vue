<template>
  <div class="trader-case-list-item-token">
    <q-card
      v-if="tokenInfo"
      class="fit q-pa-sm transition-1"
      :class="differencePercent > 0 ? 'trader-case-list-item-token-positive-border' : 'trader-case-list-item-token-negative-border'"
    >

      <!--      Token main info-->
      <div class="flex items-center">
        <div>
          <q-avatar :size="$mobile ? '30px' : '35px'" class="bg-transparent" square>
            <q-img
              v-if="tokenInfo.logo"
              :src="tokenInfo.logo"
              contain
              class="rounded-borders"
              img-class="white-shadow"
            >
              <template v-slot:loading>
                <q-skeleton class="fit"/>
              </template>
            </q-img>
          </q-avatar>
        </div>
        <div style="flex-grow: 1">
          <div class="f-w-800 q-ml-sm">{{ token.full_name }}</div>
          <div class="q-ml-sm flex justify-between items-center" style="flex-grow: 1">
            <div>
              {{ token.symbol }}
            </div>
            <div class="text-subtitle2">
              <span :class="differencePercent > 0 ? 'text-positive' : 'text-negative'"
                    class="text-uppercase f-w-800 q-pl-sm"><span
                v-if="differencePercent > 0">+</span>{{ formattedDifferencePercent }}%</span>
            </div>
            <div class="text-subtitle2">
              <span :class="pnl > 0 ? 'text-positive' : 'text-negative'" class="text-uppercase f-w-800">{{
                  formattedPnl
                }}</span>
            </div>
          </div>
        </div>
      </div>

      <!--      Token info-->
      <div class="q-mt-sm">
        <div><span class="trader-case-list-item-token-field-title">Средняя цена покупки:</span>{{ averageBuyPrice }} $</div>
        <div><span class="trader-case-list-item-token-field-title">Текущая цена:</span>{{ tokenInfo.lastPrice }} $</div>
        <div><span class="trader-case-list-item-token-field-title">Количество монет:</span>{{
            token.quantity_base_asset
          }}
        </div>
        <div><span class="trader-case-list-item-token-field-title">Вложенная сумма:</span> <span class="text-uppercase">{{
            summaryPrice
          }}</span></div>
        <div><span class="trader-case-list-item-token-field-title">Текущая сумма:</span> <span
          class="text-uppercase">{{ currentSummaryPrice }}</span></div>
      </div>

      <!--      Buttons-->
      <div class="q-mt-md flex justify-between">
        <div>
          <q-btn
            :label="showBuyCoinForm ? 'Отмена' : 'Докупить'"
            no-caps
            unelevated
            text-color="dark"
            :color="showBuyCoinForm ? 'negative' : 'positive'"
            size="sm"
            class="f-w-800"
            @click="buyCoinStart"
          />

          <q-btn
            :label="showFixCoinForm ? 'Отмена' : 'Зафиксировать'"
            no-caps
            outline
            :color="differencePercent > 0 && !showFixCoinForm ? 'positive' : 'negative'"
            size="sm"
            class="q-ml-sm"
            @click="fixCoinStart"
          />
        </div>

        <div>
          <q-btn
            icon="search"
            flat
            padding="5px"
            size="sm"
            title="Подробнее о монете"
            :to="{ name: 'market-ticker-detail', params: { symbol: token.symbol } }"
          />
          <q-btn
            icon="candlestick_chart"
            flat
            size="sm"
            padding="5px"
            class="q-ml-xs"
            title="Открыть график"
            @click="showChartPopup"
          />
        </div>
      </div>

      <!--      Buy token form-->
      <div v-if="showBuyCoinForm" class="q-mt-md">
        <div class="row items-center">
          <div class="col-5">
            <q-input
              type="number"
              v-model="buyCoinForm.quantity_base_asset"
              label="Кол-во монет"
              dense
            />
          </div>

          <div class="col-5 q-pl-xs">
            <q-input
              type="number"
              v-model="buyCoinForm.price"
              label="Цена"
              dense
            />
          </div>
          <div class="col-2 q-pl-xs text-center">
            <q-btn
              icon="add"
              color="positive"
              class=""
              dense
              text-color="dark"
              :loading="buyCoinLoading"
              @click="buyCoin"
            />
          </div>

          <div class="col-5 offset-5 q-pl-xs">
            <small class="text-grey-5">Стоимость: $ {{ addCoinSummary }}</small>
          </div>
        </div>
      </div>

      <!--      Fix token form-->
      <div v-if="showFixCoinForm" class="q-mt-md">
        <div class="row">
          <div class="col-5">
            <q-input
              type="number"
              v-model="fixCoinForm.quantity_base_asset"
              label="Кол-во монет"
              dense
            />
            <q-btn label="max" dense flat size="sm" color="warning" @click="setMaxToFixQuantity"/>
          </div>

          <div class="col-5 q-pl-xs">
            <q-input
              type="number"
              v-model="fixCoinForm.price"
              label="Цена"
              dense
            />
            <small class="text-grey-5">Прибыль: $ {{ fixCoinSummaryProfit }}</small>
          </div>
          <div class="col-2 q-pl-xs text-center">
            <q-btn
              icon="done"
              color="positive"
              class=""
              dense
              text-color="dark"
              :loading="fixCoinLoading"
              @click="fixCoin"
            />
          </div>
        </div>
      </div>

    </q-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import getDifferencePercent from 'src/helpers/difference-precent'
import errorHandler from 'src/utils/error-handler'
import notifier from 'src/utils/notifier'
import config from 'src/config'

export default {
  name: 'trader-case-list-item-token',
  props: {
    token: {
      type: Object,
      default: () => {
      }
    },
    caseId: Number
  },
  data () {
    return {
      showBuyCoinForm: false,
      showFixCoinForm: false,

      buyCoinLoading: false,
      fixCoinLoading: false,

      buyCoinForm: {
        quantity_base_asset: 1,
        price: null
      },
      fixCoinForm: {
        quantity_base_asset: 1,
        price: null
      }
    }
  },
  computed: {
    ...mapState('binanceMarket', ['symbols']),
    fixCoinsQuantity () {
      return this.fixCoinForm.quantity_base_asset
    },
    addCoinSummary () {
      return (this.buyCoinForm.price * this.buyCoinForm.quantity_base_asset).toFixed(2)
    },
    fixCoinSummaryProfit () {
      return ((this.fixCoinForm.price * this.fixCoinForm.quantity_base_asset) - (parseFloat(this.averageBuyPrice) * this.fixCoinForm.quantity_base_asset)).toFixed(2)
    },
    tokenInfo () {
      return this.symbols.find(item => item.symbol === this.token.symbol + 'USDT')
    },
    averageBuyPrice () {
      return this.token.price.toFixed(this.floatLength)
    },
    floatLength () {
      return this.tokenInfo.lastPrice.toString().split('.')[1]?.length || 0
    },
    pnl () {
      return parseFloat(((this.tokenInfo.lastPrice - this.token.price) * this.token.quantity_base_asset).toFixed(this.floatLength))
    },
    formattedPnl () {
      return this.$numeral(this.pnl).format('(0,0.00) $').replace('(', '-').replace(')', '')
    },
    differencePercent () {
      return getDifferencePercent(this.token.price, this.tokenInfo.lastPrice)
    },
    formattedDifferencePercent () {
      return this.differencePercent.toFixed(2)
    },
    summaryPrice () {
      return this.$numeral(this.token.quantity_base_asset * this.token.price).format('(0,0.00) $').replace('(', '-').replace(')', '')
    },
    currentSummaryPrice () {
      return this.$numeral(this.token.quantity_base_asset * this.tokenInfo.lastPrice).format('(0,0.00) $').replace('(', '-').replace(')', '')
    }
  },
  methods: {
    ...mapActions('trader', ['getTrader']),
    getDifferencePercent,

    setMaxToFixQuantity () {
      this.fixCoinForm.quantity_base_asset = this.token.quantity_base_asset
    },

    async showChartPopup () {
      const vm = this
      await vm.$router.replace({
        query: {
          ...vm.$route.query,
          chart: vm.token.symbol
        }
      })
    },

    buyCoinStart () {
      this.showBuyCoinForm = !this.showBuyCoinForm
      this.showFixCoinForm = false
      this.buyCoinForm.price = this.tokenInfo.lastPrice
    },

    fixCoinStart () {
      this.showFixCoinForm = !this.showFixCoinForm
      this.showBuyCoinForm = false
      this.fixCoinForm.price = this.tokenInfo.lastPrice
    },

    async buyCoin () {
      const vm = this
      const jwt = localStorage.getItem('jwt')
      vm.buyCoinLoading = true

      // Усредненная стоимость
      const averagePrice = (
        Math.abs(parseFloat(this.buyCoinForm.price)) * Math.abs(parseFloat(this.buyCoinForm.quantity_base_asset)) +
          Math.abs(parseFloat(this.token.price)) * Math.abs(parseFloat(this.token.quantity_base_asset))) /
        (Math.abs(parseFloat(this.buyCoinForm.quantity_base_asset)) + Math.abs(parseFloat(this.token.quantity_base_asset)))
      const summaryQuantity = Math.abs(parseFloat(this.buyCoinForm.quantity_base_asset)) + Math.abs(parseFloat(this.token.quantity_base_asset))
      try {
        await vm.$axios
          .patch(`${config.socialServerURI}/case_token/update/${vm.token.id}/`, {
            price: averagePrice,
            quantity_base_asset: summaryQuantity,
            sum_in_usd: averagePrice * summaryQuantity
          }, {
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
          .then(async res => {
            if (res.status === 200) {
              notifier(`Монеты ${vm.token.symbol} были успешно добавлены`, 'positive')
              await vm.getTrader()
              vm.showBuyCoinForm = false
              vm.buyCoinForm = {
                quantity_base_asset: 1,
                price: null
              }
            }
          })
      } catch (e) {
        notifier('Не удалось докупить монеты.', 'negative')
        errorHandler(e)
      } finally {
        vm.buyCoinLoading = false
      }
    },

    async fixCoin () {
      const vm = this
      const jwt = localStorage.getItem('jwt')
      const profit = parseFloat(vm.fixCoinSummaryProfit)
      vm.fixCoinLoading = true

      try {
        await vm.$axios
          .post(`${config.socialServerURI}/case_token_fixed/create/`, {
            case: vm.caseId,
            symbol: vm.token.symbol,
            logo: vm.token.logo,
            price: Math.abs(Number(vm.fixCoinForm.price)),
            quantity_base_asset: Math.abs(Number(vm.fixCoinForm.quantity_base_asset)),
            profit
          }, {
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
          .then(async res => {
            if (res.status === 201) {
              await vm.updateCoin()
              await vm.getTrader()
              notifier(`Монеты ${vm.token.symbol} были успешно зафиксированы.`, 'positive')
              vm.showFixCoinForm = false
              vm.fixCoinForm = {
                quantity_base_asset: 1,
                price: null
              }
            }
          })
      } catch (e) {
        notifier('Не удалось зафиксировать монеты.', 'negative')
        errorHandler(e)
      } finally {
        vm.fixCoinLoading = false
      }
    },
    async updateCoin () {
      const vm = this
      const jwt = localStorage.getItem('jwt')
      const quantity = Math.abs(Number(this.token.quantity_base_asset)) - Math.abs(Number(this.fixCoinForm.quantity_base_asset))

      if (quantity > 0) {
        try {
          await vm.$axios
            .patch(`${config.socialServerURI}/case_token/update/${vm.token.id}/`, {
              quantity_base_asset: quantity
            }, {
              headers: {
                Authorization: `Bearer ${jwt}`
              }
            })
        } catch (e) {
          errorHandler(e)
        }
      } else {
        try {
          await vm.$axios
            .delete(`${config.socialServerURI}/case_token/delete/${vm.token.id}/`, {
              headers: {
                Authorization: `Bearer ${jwt}`
              }
            })
        } catch (e) {
          errorHandler(e)
        }
      }
    }
  },
  watch: {
    fixCoinsQuantity (val) {
      if (val > this.token.quantity_base_asset) {
        this.fixCoinForm.quantity_base_asset = this.token.quantity_base_asset
      }
    }
  }
}
</script>

<style lang="sass">
.trader-case-list-item-token-field-title
  color: $grey-5
  width: 160px
  display: inline-block

.trader-case-list-item-token-positive-border
  background: rgb(30, 34, 45)
  background: linear-gradient(153deg, rgba(30, 34, 45, 0) 72%, rgba(24, 188, 131, 0.3) 100%)

.trader-case-list-item-token-negative-border
  background: rgb(30, 34, 45)
  background: linear-gradient(153deg, rgba(30, 34, 45, 0) 72%, rgba(244, 66, 83, 0.3) 100%)
</style>
