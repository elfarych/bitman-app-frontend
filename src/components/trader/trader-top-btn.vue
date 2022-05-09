<template>
<div class="trader-top-btn">
  <q-btn
    icon="account_circle"
    dense
    flat
    class="text-white-shadow-light rounded-borders"
    @click="clicked"
  />
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'trader-top-btn',
  computed: {
    ...mapState('trader', ['user'])
  },
  methods: {
    clicked () {
      const vm = this
      vm.$router.push({
        name: vm.user ? 'Profile' : 'Auth'
      })
    }
  }
}
</script>

<style scoped>

</style>
