<template>
<q-page class="q-pa-sm">
  <portal to="title">
    <base-page-top-title title="Roadmap"/>
  </portal>

  <base-page-title :real-time-text="false" screener-name="Roadmap"/>

  <div class="q-mt-lg">
    <roadmap />
  </div>
</q-page>
</template>

<script>
import BasePageTopTitle from 'components/base-page-top-title'
import BasePageTitle from 'components/base-page-title'
import Roadmap from 'components/roadmap/roadmap'
export default {
  name: 'page-roadmap',
  components: { Roadmap, BasePageTitle, BasePageTopTitle }
}
</script>

<style scoped>

</style>
