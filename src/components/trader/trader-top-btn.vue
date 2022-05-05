<template>
<div class="trader-top-btn">
  <q-btn
    icon="person"
    dense
    flat
    class="text-white-shadow-light"
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
