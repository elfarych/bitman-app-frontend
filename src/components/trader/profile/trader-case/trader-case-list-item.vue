<template>
  <div class="trader-case-list-item">
    <q-expansion-item
      header-class="text-subtitle2 f-w-800"
      group="case"
      class="bg-dark rounded-borders column"
      :default-opened="opened"
      expand-icon="none"
    >
      <!--    Header-->
      <template v-slot:header>
        <div class="full-width">
          <div class="flex items-center justify-between full-width no-wrap">
            <div class="flex items-center no-wrap">
              <div>
                <q-icon name="business_center" size="30px"/>
              </div>
              <div class="q-ml-md">
                <div class="text-subtitle1 f-w-800 l-h-12">{{ traderCase.title }}</div>
                <div class="f-w-400 block l-h-12 q-mt-sm">{{ traderCase.text }}</div>
                <div>
                  <small class="f-w-200 l-h-12 block q-mt-sm">Создан: {{
                      traderCase ? $dayjs(traderCase.date).format('DD.MM.YYYY') : ''
                    }}</small>
                </div>
              </div>
            </div>

            <div class="flex column justify-end">
              <q-btn
                :label="$mobile ? '' : 'Редактировать'"
                icon="edit"
                size="sm"
                dense flat no-wrap no-caps
                color="secondary"
                @click.stop="editCase"
              />

              <q-btn
                :label="$mobile ? '' : 'Удалить'"
                icon="delete_forever"
                size="sm"
                dense flat no-wrap no-caps
                color="negative"
                class="q-mt-md"
                @click.stop="deleteDialog = true"
              />
            </div>

          </div>

          <div v-if="traderCase.items.length">
            <q-separator class="q-my-sm"/>
            <div class="row q-col-gutter-md">
              <div class="col-6 col-sm-3">
                <small class="text-grey-5 f-w-400">Доходность $</small>
                <div :class="caseProfit > 0 ? 'text-positive' : 'text-negative'" class="text-subtitle1 f-w-800">{{ priceFormatter(caseProfit) }}</div>
              </div>

              <div class="col-6 col-sm-3">
                <small class="text-grey-5 f-w-400">Доходность %</small>
                <div class="text-subtitle1 f-w-800" :class="caseProfit > 0 ? 'text-positive' : 'text-negative'">{{ percentProfitFormatted }}</div>
              </div>

              <div class="col-6 col-sm-3">
                <small class="text-grey-5 f-w-400">Текущая стоимость $</small>
                <div :class="caseProfit > 0 ? 'text-positive' : 'text-negative'" class="text-subtitle1 f-w-800">{{ priceFormatter(caseCurrentSum) }}</div>
              </div>

              <div class="col-6 col-sm-3">
                <small class="text-grey-5 f-w-400">Инвестировано $</small>
                <div class="text-subtitle1 f-w-800">{{ priceFormatter(caseSum) }}</div>
                <small class="text-grey-5 f-w-400 block" style="font-size: 9px; line-height: 9px">Без учета зафиксированной суммы</small>
              </div>
            </div>
          </div>

        </div>

      </template>

      <div class="q-pa-md">
        <!--    Empty case-->
        <div v-if="!traderCase.items.length" class="">
          Портфель пуст.
        </div>

        <!--        Case coins-->
        <div v-if="traderCase && traderCase.items.length">
          <div class="f-w-600 text-subtitle1">Активы</div>
          <q-separator class="q-mb-md"/>
          <div class="row q-col-gutter-md">
            <div
              v-for="token in traderCase.items"
              :key="token.id"
              class="col-sm-6 col-lg-3 col-12"
            >
              <trader-case-list-item-token :token="token" :case-id="traderCase.id"/>
            </div>
          </div>
        </div>

        <!--        Add coin to case button-->
        <trader-case-add-coin :case-id="traderCase.id" :case-tokens="traderCase.items"/>

        <!--        Case fixed coins-->
        <div v-if="traderCase && traderCase.fixed_items.length" class="q-mt-xl">
          <div class="f-w-600 text-subtitle1">
            {{ fixedProfit > 0 ? 'Зафиксированная прибыль:' : 'Зафиксированный убыток:' }}
            <span class="f-w-800" :class="fixedProfit > 0 ? 'text-positive' : 'text-negative'">{{
                priceFormatter(fixedProfit)
              }}</span>
          </div>
          <q-separator class="q-mb-md"/>
          <div
            v-for="token in traderCase.fixed_items"
            :key="token.id"
          >
            <trader-case-list-item-fixed-token :token="token"/>
          </div>
        </div>
      </div>
    </q-expansion-item>

    <!--    Case edit dialog-->
    <q-dialog v-model="editCaseDialog">
      <q-card style="width: 555px; max-width: 100%">
        <q-toolbar>
          <q-toolbar-title class="text-subtitle1 f-w-600">Редактирование портфеля</q-toolbar-title>
          <q-btn icon="close" dense flat v-close-popup/>
        </q-toolbar>

        <q-card-section>
          <q-form @submit="caseFormSubmit">
            <q-input v-model="caseForm.title" label="Название портфеля*" outlined dense :rules="rulesNoEmpty">
              <template v-slot:prepend>
                <q-icon name="business_center"/>
              </template>
            </q-input>
            <q-input v-model="caseForm.text" type="textarea" label="Описание (необязательно)" outlined dense/>
            <q-checkbox v-model="caseForm.public" label="Публичный портфель"
                        title="Ваш портфель смогут видеть все пользователи" class="q-mt-sm"/>
            <q-btn type="submit" label="Сохранить" color="secondary"
                   class="full-width q-mt-md f-w-800 q-py-sm text-white-shadow" unelevated/>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!--    Case delete dialog-->
    <q-dialog v-model="deleteDialog" persistent>
      <q-card style="width: 555px; max-width: 100%">
        <q-toolbar>
          <q-toolbar-title class="text-subtitle1 f-w-600">Удалить портфель?</q-toolbar-title>
          <q-btn icon="close" dense flat v-close-popup/>
        </q-toolbar>

        <q-card-actions align="right">
          <q-btn
            icon="delete_forever"
            label="Удалить"
            color="negative"
            no-caps
            unelevated
            outline
            :loading="deleteCaseLoading"
            @click="deleteCase"
          />

          <q-btn
            label="Отмена"
            no-caps
            unelevated
            flat
            class="q-ml-md"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import config from 'src/config'
import notifier from 'src/utils/notifier'
import errorHandler from 'src/utils/error-handler'
import { mapActions, mapState } from 'vuex'
import TraderCaseAddCoin from 'components/trader/profile/trader-case/trader-case-add-coin'
import TraderCaseListItemToken from 'components/trader/profile/trader-case/trader-case-list-item-token'
import TraderCaseListItemFixedToken from 'components/trader/profile/trader-case/trader-case-list-item-fixed-token'
import getDifferencePercent from 'src/helpers/difference-precent'

export default {
  name: 'trader-case-list-item',
  components: { TraderCaseListItemFixedToken, TraderCaseListItemToken, TraderCaseAddCoin },
  props: {
    traderCase: {
      type: Object,
      default: () => {
      }
    },
    opened: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('binanceMarket', ['symbols']),
    rulesNoEmpty () {
      return [
        val => (!!val) || 'Это обязательное поле'
      ]
    },
    percentProfit () {
      return this.getDifferencePercent(this.caseSum, this.caseCurrentSum)
    },
    percentProfitFormatted () {
      return this.percentProfit.toFixed(2)
    },
    fixedProfit () {
      let profit = 0
      if (this.traderCase.fixed_items.length) {
        this.traderCase.fixed_items.forEach(item => {
          profit += item.profit
        })
      }
      return profit
    },
    caseProfit () {
      let profit = 0
      if (this.traderCase.items.length && this.symbols.length) {
        this.traderCase.items.forEach(item => {
          const itemInfo = this.symbols.find(s => s.symbol === item.symbol + 'USDT')
          const itemProfit = (parseFloat(itemInfo.lastPrice) * parseFloat(item.quantity_base_asset)) - (parseFloat(item.price) * parseFloat(item.quantity_base_asset))
          profit += itemProfit
        })
      }
      return profit
    },
    caseCurrentSum () {
      let sum = 0
      if (this.traderCase.items.length && this.symbols.length) {
        this.traderCase.items.forEach(item => {
          const itemInfo = this.symbols.find(s => s.symbol === item.symbol + 'USDT')
          const itemSum = parseFloat(itemInfo.lastPrice) * parseFloat(item.quantity_base_asset)
          sum += itemSum
        })
      }
      return sum
    },
    caseSum () {
      let sum = 0
      if (this.traderCase.items.length) {
        this.traderCase.items.forEach(item => {
          const itemSum = parseFloat(item.price) * parseFloat(item.quantity_base_asset)
          sum += itemSum
        })
      }

      return sum
    }
  },
  data () {
    return {
      deleteDialog: false,
      deleteCaseLoading: false,
      editCaseDialog: false,
      addCaseLoading: false,
      addCoinLoading: false,
      addCoinForm: {},
      caseForm: {
        title: '',
        text: '',
        public: false
      }
    }
  },
  methods: {
    ...mapActions('trader', ['getTrader']),
    getDifferencePercent,
    priceFormatter (price) {
      return this.$numeral(price).format('(0,0.00)').replace('(', '-').replace(')', '')
    },
    async addCoin () {
      const vm = this
      vm.addCoinLoading = true
    },
    async editCase () {
      this.caseForm = {
        title: this.traderCase.title,
        text: this.traderCase.text,
        public: this.traderCase.public
      }
      this.editCaseDialog = true
    },
    async caseFormSubmit () {
      const vm = this
      vm.addCaseLoading = true
      const jwt = localStorage.getItem('jwt')
      try {
        await vm.$axios.patch(`${config.socialServerURI}/case/update/${vm.traderCase.id}/`, {
          ...vm.caseForm
        }, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
          .then(async res => {
            if (res.status === 200) {
              notifier('Порфтель успешно обновлен.', 'positive')
              vm.addCaseDialog = false
              await vm.getTrader()
              this.editCaseDialog = false
            } else {
              notifier('Что-то пошло не так.')
            }
          })
      } catch (e) {
        notifier('Не удалось обновить порфтель. Произошла ошибка.', 'dark')
        errorHandler(e)
      } finally {
        vm.addCaseLoading = false
      }
    },

    async deleteCase () {
      const vm = this
      vm.deleteCaseLoading = true
      const jwt = localStorage.getItem('jwt')

      if (this.traderCase.items.length) {
        this.traderCase.items.forEach(item => {
          try {
            vm.$axios.delete(`${config.socialServerURI}/case_token/delete/${item.id}/`, {
              headers: {
                Authorization: `Bearer ${jwt}`
              }
            })
          } catch (e) {
            errorHandler(e)
          }
        })
      }

      if (this.traderCase.fixed_items.length) {
        this.traderCase.items.forEach(item => {
          try {
            vm.$axios.delete(`${config.socialServerURI}/case_token_fixed/delete/${item.id}/`, {
              headers: {
                Authorization: `Bearer ${jwt}`
              }
            })
          } catch (e) {
            errorHandler(e)
          }
        })
      }
      try {
        await vm.$axios.delete(`${config.socialServerURI}/case/delete/${vm.traderCase.id}/`, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
          .then(async res => {
            if (res.status === 204) {
              notifier('Порфтель успешно удален.', 'positive')
              await vm.getTrader()
              this.deleteDialog = false
            } else {
              notifier('Что-то пошло не так.')
            }
          })
      } catch (e) {
        notifier('Не удалось удалить порфтель. Произошла ошибка.', 'dark')
        errorHandler(e)
      } finally {
        vm.deleteCaseLoading = false
      }
    }
  }
}
</script>

<style lang="sass">
.trader-case-list-item
  .rounded-borders
    overflow: hidden !important

  .q-item__section--side
    display: none !important
</style>
