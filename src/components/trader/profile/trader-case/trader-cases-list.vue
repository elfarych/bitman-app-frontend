<template>
  <div v-if="trader" class="trader-cases-list">
    <div
      v-for="traderCase in trader.cases"
      :key="traderCase.id"
      class="q-mt-md"
    >
      <trader-case-list-item
        :trader-case="traderCase"
        opened
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TraderCaseListItem from 'components/trader/profile/trader-case/trader-case-list-item'

export default {
  name: 'trader-cases-list',
  components: { TraderCaseListItem },
  computed: {
    ...mapState('trader', ['trader'])
  }
}
</script>

<style scoped>

</style>
