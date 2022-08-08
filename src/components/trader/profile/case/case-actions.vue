<template>
<div class="case-actions">
  <div>
    <div class="flex column justify-end">
      <q-btn
        icon="edit"
        size="sm"
        dense flat no-wrap no-caps
        color="secondary"
        @click.stop="editCase"
      />

      <q-btn
        icon="delete_forever"
        size="sm"
        dense flat no-wrap no-caps
        color="negative"
        class="q-mt-md"
        @click.stop="deleteDialog = true"
      />
    </div>
  </div>

  <!--    Case edit dialog-->
  <q-dialog v-model="editCaseDialog">
    <q-card style="width: 555px; max-width: 100%">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle1 f-w-600">Case edit "{{ traderCase.title }}"</q-toolbar-title>
        <q-btn icon="close" dense flat v-close-popup/>
      </q-toolbar>

      <q-card-section>
        <q-form @submit="caseFormSubmit">
          <q-input v-model="caseForm.title" label="Case name*" outlined dense :rules="rulesNoEmpty">
            <template v-slot:prepend>
              <q-icon name="business_center"/>
            </template>
          </q-input>
          <q-input v-model="caseForm.text" type="textarea" label="Description (optional)" outlined dense/>
          <q-checkbox v-model="caseForm.public" label="Public case"
                      class="q-mt-sm"/>
          <q-btn type="submit" label="Save" color="secondary"
                 class="full-width q-mt-md f-w-800 q-py-sm text-white-shadow" unelevated/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!--    Case delete dialog-->
  <q-dialog v-model="deleteDialog" persistent>
    <q-card style="width: 555px; max-width: 100%">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle1 f-w-600">Delete case "{{ traderCase.title }}"?</q-toolbar-title>
        <q-btn icon="close" dense flat v-close-popup/>
      </q-toolbar>

      <q-card-actions align="right">
        <q-btn
          icon="delete_forever"
          label="Delete"
          color="negative"
          no-caps
          unelevated
          outline
          :loading="deleteCaseLoading"
          @click="caseDelete"
        />

        <q-btn
          label="Cancel"
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
import { mapActions } from 'vuex'

export default {
  name: 'case-actions',
  props: {
    traderCase: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      deleteDialog: false,
      deleteCaseLoading: false,
      editCaseDialog: false,
      addCaseLoading: false,
      caseForm: {
        title: '',
        text: '',
        public: false
      }
    }
  },
  computed: {
    rulesNoEmpty () {
      return [
        val => (!!val) || 'This is a required field'
      ]
    }
  },
  methods: {
    ...mapActions('traderCase', ['updateCase', 'createCase', 'deleteCase']),
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

      await vm.updateCase({ caseId: vm.traderCase.id, data: vm.caseForm })
      vm.addCaseDialog = false
      this.editCaseDialog = false
      vm.addCaseLoading = false
    },
    async caseDelete () {
      const vm = this
      vm.deleteCaseLoading = true

      await vm.deleteCase({ caseId: vm.traderCase.id, data: vm.traderCase })
      this.deleteDialog = false
      vm.deleteCaseLoading = false
    }
  }
}
</script>

<style scoped>

</style>
