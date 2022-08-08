<template>
<div class="logout text-right">
  <q-btn
    icon-right="logout"
    label="Logout"
    no-caps
    flat
    dense
    size="sm"
    @click="logoutDialog = true"
  />

  <!--    Case delete dialog-->
  <q-dialog v-model="logoutDialog" persistent>
    <q-card style="width: 555px; max-width: 100%">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle1 f-w-600">Logout?</q-toolbar-title>
        <q-btn icon="close" dense flat v-close-popup/>
      </q-toolbar>

      <q-card-actions align="right">
        <q-btn
          icon-right="logout"
          label="Logout"
          color="negative"
          no-caps
          unelevated
          outline
          @click="logout"
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
import { mapMutations } from 'vuex'

export default {
  name: 'logout',
  methods: {
    ...mapMutations('trader', ['mutationUser', 'mutationTrader']),
    logout () {
      this.mutationUser(null)
      this.mutationTrader(null)
      localStorage.setItem('jwt', null)
      this.$router.replace({
        name: 'Auth'
      })
    }
  },
  data () {
    return {
      logoutDialog: false
    }
  }
}
</script>

<style scoped>

</style>
