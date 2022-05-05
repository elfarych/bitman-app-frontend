<template>
<div class="case-tokens">
  <div class="row q-col-gutter-md">
    <div
      v-for="token in tokens"
      :key="token.id"
      class="col-sm-6 col-lg-4 col-12"
    >
      <case-token :case-id="caseId" :token="token"/>
    </div>
  </div>
</div>
</template>

<script>
import CaseToken from 'components/trader/profile/case/case-token'
export default {
  name: 'case-tokens',
  components: { CaseToken },
  props: {
    tokens: {
      type: Array,
      default: () => []
    },
    caseId: Number
  }
}
</script>

<style scoped>

</style>
