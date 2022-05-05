<template>
<div class="trader-cases">
  <div class="trader-cases-list">
    <div
      v-for="traderCase in cases"
      :key="traderCase.id"
      class="q-mt-md"
    >
      <case :trader-case="traderCase"/>
    </div>
  </div>
</div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import Case from 'components/trader/profile/case/case'

export default {
  name: 'case-list',
  components: { Case },
  computed: {
    ...mapState('traderCase', ['cases'])
  },
  methods: {
    ...mapActions('traderCase', ['loadCases'])
  },
  created () {
    this.loadCases()
  }
}
</script>

<style scoped>

</style>
