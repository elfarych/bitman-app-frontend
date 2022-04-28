<template>
<div class="trader-case-list-item">
  <q-expansion-item
    header-class="text-subtitle2 f-w-800"
    group="case"
    class="bg-dark rounded-borders column"
    :default-opened="opened"
    expand-icon="none"
  >
    <template v-slot:header>
      <div class="flex items-center justify-between full-width">
        <div class="flex items-center">
          <div>
            <q-icon name="business_center" size="30px"/>
          </div>
          <div class="q-ml-md">
            <div class="text-subtitle1 f-w-800">{{ caseItem.title }}</div>
            <div class="f-w-600 fontsize-13">{{ caseItem.text }}</div>
            <small class="f-w-200">Монет: {{ caseItem ? caseItem.items.length : '' }}</small>
          </div>
        </div>

        <div>
          <q-btn
            :label="$mobile ? '' : 'Редактировать'"
            icon="edit"
            size="sm"
            dense flat no-wrap no-caps
            color="secondary"
            @click.stop="editCase"
          />
        </div>
      </div>

    </template>

    <div class="q-pa-sm">
      <div v-if="!caseItem.items.length" class="">
        Портфель пуст.
      </div>

      <trader-case-add-coin />
    </div>
  </q-expansion-item>

  <q-dialog v-model="editCaseDialog">
    <q-card style="width: 555px; max-width: 100%">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle1 f-w-600">Редактирование портфеля</q-toolbar-title>
        <q-btn icon="close" dense flat v-close-popup/>
      </q-toolbar>

      <q-card-section>
        <q-form @submit="caseFormSubmit">
          <q-input v-model="caseForm.title" label="Название портфеля*" outlined dense :rules="rulesNoEmpty">
            <template v-slot:prepend><q-icon name="business_center"/></template>
          </q-input>
          <q-input v-model="caseForm.text" type="textarea" label="Описание (необязательно)" outlined dense/>
          <q-checkbox v-model="caseForm.public" label="Публичный портфель" title="Ваш портфель смогут видеть все пользователи" class="q-mt-sm"/>
          <q-btn type="submit" label="Создать" color="secondary" class="full-width q-mt-md f-w-800 q-py-sm text-white-shadow" unelevated/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
import config from 'src/config'
import notifier from 'src/utils/notifier'
import errorHandler from 'src/utils/error-handler'
import { mapActions } from 'vuex'
import TraderCaseAddCoin from 'components/trader/profile/trader-case/trader-case-add-coin'

export default {
  name: 'trader-case-list-item',
  components: { TraderCaseAddCoin },
  props: {
    caseItem: {
      type: Object,
      default: () => {}
    },
    opened: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rulesNoEmpty () {
      return [
        val => (!!val) || 'Это обязательное поле'
      ]
    }
  },
  data () {
    return {
      editCaseDialog: false,
      addCaseLoading: false,
      addCoinLoading: false,
      addCoinForm: {

      },
      caseForm: {
        title: '',
        text: '',
        public: false
      }
    }
  },
  methods: {
    ...mapActions('trader', ['getTrader']),
    async addCoin () {
      const vm = this
      vm.addCoinLoading = true
    },
    async editCase () {
      this.caseForm = { ...this.caseItem }
      this.editCaseDialog = true
    },
    async caseFormSubmit () {
      const vm = this
      vm.addCaseLoading = true
      const jwt = localStorage.getItem('jwt')
      try {
        await vm.$axios.patch(`${config.socialServerURI}/case/update/${vm.caseItem.id}/`, {
          ...vm.caseForm
        }, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
          .then(res => {
            if (res.status === 201) {
              notifier('Порфтель успешно обновлен.', 'positive')
              vm.addCaseDialog = false
              vm.getTrader()
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
