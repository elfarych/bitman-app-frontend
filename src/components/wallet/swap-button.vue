<template>
<div class="swap-button">
  <q-btn
    :label="$t('swap')"
    class="f-w-800 q-mt-lg q-pa-sm rounded-borders-xl full-width"
    no-caps
    style="font-size: 18px"
    color="primary"
    text-color="dark"
    icon-right="sync"
    :loading="swapLoading"
    @click="swapBtmtToken"
  />
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'swap-button',
  computed: {
    ...mapState('wallet', ['swapLoading'])
  },
  methods: {
    ...mapActions('wallet', ['swapBtmtToken'])
  }
}
</script>

<style scoped>

</style>
