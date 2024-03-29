<template>
<div class="trader-profile-main-info">

  <div class="flex items-center">
    <div>
      <q-avatar size="70px" square class="rounded-borders">
        <q-img v-if="trader && trader.avatar" :src="trader.avatar" height="70px" width="70px" class="rounded-borders">
          <template v-slot:loading><q-skeleton class="fit"/></template>
        </q-img>
        <q-icon v-else name="person" size="60px"/>
      </q-avatar>
    </div>

    <div class="q-ml-md">
      <small>{{ user ? user.username : '' }}</small>
      <div class="text-subtitle1 f-w-800 text-white-shadow">{{ trader ? trader.name : 'Anonim' }}</div>
      <div>
        <q-btn
          label="Edit"
          icon="edit"
          size="sm"
          color="secondary"
          outline
          no-caps
          dense
          flat
          @click="openEditDialog"
        />
      </div>
    </div>
  </div>

  <q-dialog v-model="editDialog">
    <q-card style="width: 555px; max-width: 100%">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle1">Edit profile</q-toolbar-title>
        <q-btn icon="close" v-close-popup flat dense/>
      </q-toolbar>

      <q-card-section>
        <q-input v-model="traderName">
          <template v-slot:prepend>
            <q-icon name="person"/>
          </template>

          <template v-slot:append>
            <q-btn
              icon="save"
              dense
              flat
              :loading="nameSaveLoading"
              :color="traderName !== trader.name ? 'positive' : ''"
              :disable="traderName === trader.name"
              title="Save"
              @click="saveForm"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section>
        <div class="q-mb-sm">Photo:</div>
        <q-uploader
          :url="imageUploadUrl"
          :headers="[{name: 'Authorization', value: `Bearer ${jwt}`}]"
          style="width: 100%"
          method="PATCH"
          field-name="avatar"
          accept=".jpg, image/*"
          @uploaded="rejected"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import notifier from 'src/utils/notifier'
import config from 'src/config'

export default {
  name: 'trader-profile-main-info',
  computed: {
    ...mapState('trader', ['trader', 'user']),
    imageUploadUrl () {
      if (this.trader) return `${config.socialServerURI}/trader/update/${this.trader.id}/`
      return ''
    },
    jwt () {
      return localStorage.getItem('jwt')
    }
  },
  methods: {
    ...mapActions('trader', ['updateTrader', 'getTrader']),
    openEditDialog () {
      const vm = this
      vm.traderName = vm.trader.name
      vm.editDialog = true
    },
    async rejected () {
      const vm = this
      await vm.getTrader()
      notifier('Photo uploaded', 'positive')
    },
    async saveForm () {
      const vm = this
      vm.nameSaveLoading = true

      try {
        await vm.updateTrader({ name: vm.traderName })
        notifier('Profile updated.', 'positive')
      } catch (e) {
        notifier('Error.', 'negative')
      } finally {
        vm.nameSaveLoading = false
      }
    }
  },
  data () {
    return {
      editDialog: false,
      traderName: '',
      nameSaveLoading: false
    }
  },
  mounted () {

  }
}
</script>

<style scoped>

</style>
