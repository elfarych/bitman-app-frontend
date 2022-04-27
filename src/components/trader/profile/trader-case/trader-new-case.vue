<template>
<div class="trader-new-case">
  <q-btn
    :label="addCaseTitle"
    color="secondary"
    icon="add"
    no-caps
    unelevated
    :loading="addCaseLoading"
    @click="addCase"
  />

  <q-dialog v-model="addCaseDialog">
    <q-card style="width: 555px; max-width: 100%">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle1 f-w-600">Новый портфель</q-toolbar-title>
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
import { mapActions, mapState } from 'vuex'
import errorHandler from 'src/utils/error-handler'
import notifier from 'src/utils/notifier'
import config from 'src/config'

export default {
  name: 'trader-new-case',
  computed: {
    ...mapState('trader', ['trader']),
    addCaseTitle () {
      return this.trader && this.trader.cases && this.trader.cases.length ? 'Добавить портфель' : 'Создать портфель'
    },
    rulesNoEmpty () {
      return [
        val => (!!val) || 'Это обязательное поле'
      ]
    }
  },
  data () {
    return {
      addCaseDialog: false,
      addCaseLoading: false,
      caseForm: {
        title: '',
        text: '',
        public: false
      }
    }
  },
  methods: {
    ...mapActions('trader', ['getTrader']),
    addCase () {
      this.addCaseDialog = true
    },
    async caseFormSubmit () {
      const vm = this
      vm.addCaseLoading = true
      const jwt = localStorage.getItem('jwt')
      try {
        await vm.$axios
          .post(`${config.socialServerURI}/case/create/`, {
            ...vm.caseForm
          }, {
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          })
          .then(res => {
            if (res.status === 201) {
              notifier('Порфтель успешно создан.', 'positive')
              vm.addCaseDialog = false
              vm.getTrader()
            } else {
              notifier('Что-то пошло не так.')
            }
          })
      } catch (e) {
        notifier('Не удалось создать порфтель. Произошла ошибка.', 'dark')
        errorHandler(e)
      } finally {
        vm.addCaseLoading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
