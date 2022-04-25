<template>
<div class="trader-profile-main-info">

  <q-avatar size="70px" square>
    <q-img v-if="trader.avatar" :src="trader.avatar"/>
    <q-icon v-else name="person" size="60px"/>

    <q-btn
      icon="edit"
      class="absolute-bottom-right"
      dense
      size="sm"
      color="secondary"
      style="right: 0; bottom: 0"
    />
  </q-avatar>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'trader-profile-main-info',
  computed: {
    ...mapState('trader', ['trader'])
  },
  methods: {
    ...mapActions('trader', ['updateTrader'])
  },
  mounted () {
    if (this.trader && !this.trader.name) {
      this.updateTrader({ name: 'Аноним ' + this.trader.id })
    }
  }
}
</script>

<style scoped>

</style>
