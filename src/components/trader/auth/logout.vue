<template>
<div class="logout text-right">
  <q-btn
    icon-right="logout"
    label="Выход"
    no-caps
    flat
    dense
    size="sm"
    @click="logout"
  />
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
  }
}
</script>

<style scoped>

</style>
