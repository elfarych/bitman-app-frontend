<template>
<div class="trader-case-add-coin">
<q-btn
  label="Добавить монету"
  icon="add"
  size="sm"
  color="positive"
  outline no-caps
  class="q-mt-md"
  @click="addCoinStart"
/>
  <q-dialog v-model="dialog">
    <q-card style="width: 555px; max-width: 100%">
      <q-toolbar>
        <q-space />
        <q-btn icon="close" dense flat v-close-popup/>
      </q-toolbar>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
export default {
  name: 'trader-case-add-coin',
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    addCoinStart () {
      this.dialog = true
    },
    async addCoin () {
      const vm = this
    }
  }
}
</script>

<style scoped>

</style>
