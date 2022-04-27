<template>
<div class="trader-case">
<div>
</div>
<!--  Cases -->
  <trader-cases-list class="q-my-md"/>
<!--  New case-->
  <trader-new-case />
</div>
</template>

<script>

import TraderNewCase from 'components/trader/profile/trader-case/trader-new-case'
import TraderCasesList from 'components/trader/profile/trader-case/trader-cases-list'
export default {
  name: 'trader-case',
  components: { TraderCasesList, TraderNewCase }
}
</script>

<style scoped>

</style>
