<template>
  <q-btn
    :label="$t('getAirdrop')"
    class="f-w-800 q-mt-lg q-pa-sm rounded-borders-xl full-width"
    no-caps
    style="font-size: 18px"
    color="primary"
    text-color="dark"
    :loading="swapLoading"
    @click="getAirDrop"
  />
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'get-airdrop-btn',
  computed: {
    ...mapState('wallet', ['swapLoading'])
  },
  methods: {
    ...mapActions('wallet', ['getAirDrop'])
  }
}
</script>

<style scoped>

</style>
