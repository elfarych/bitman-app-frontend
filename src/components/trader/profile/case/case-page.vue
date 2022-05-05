<template>
<div class="case-page">
  <add-case class="q-mt-lg"/>
  <case-list v-if="trader"/>

</div>
</template>

<script>
import { mapState } from 'vuex'
import CaseList from 'components/trader/profile/case/case-list'
import AddCase from 'components/trader/profile/case/add-case'
export default {
  name: 'case-page',
  components: { AddCase, CaseList },
  computed: {
    ...mapState('trader', ['trader'])
  }
}
</script>

<style scoped>

</style>
