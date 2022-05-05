<template>
<div class="add-case">
  <q-btn
    :label="addCaseTitle"
    color="secondary"
    icon="add"
    no-caps
    unelevated
    :loading="addCaseLoading"
    class="q-py-xs"
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

export default {
  name: 'add-case',
  computed: {
    ...mapState('traderCase', ['cases']),
    addCaseTitle () {
      return this.cases.length ? 'Добавить портфель' : 'Создать портфель'
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
    ...mapActions('traderCase', ['createCase']),
    addCase () {
      this.addCaseDialog = true
    },
    async caseFormSubmit () {
      const vm = this
      vm.addCaseLoading = true
      await vm.createCase({ data: vm.caseForm })
      vm.addCaseDialog = false
      vm.addCaseLoading = false
    }
  }
}
</script>

<style scoped>

</style>
