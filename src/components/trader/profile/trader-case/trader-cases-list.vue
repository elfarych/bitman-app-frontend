<template>
  <div v-if="trader" class="trader-cases-list">
    <div
      v-for="traderCase in trader.cases"
      :key="traderCase.id"
      class="q-mt-md"
    >
      <trader-case-list-item
        :case-item="traderCase"
        class="q-ml-xs"
        :opened="trader.cases && trader.cases.length > 1"
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
