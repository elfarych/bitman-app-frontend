<template>
<div class="arbitration-table">

  <q-input
    v-model="searchText"
    outlined
    dense
    label="Search"
    clearable
    style="max-width: 100%; width: 500px"
    class=""
  />
<!--  Header-->
  <div class="row text-subtitle1 f-w-800 q-pb-sm q-mt-md">
    <div class="col-3">
      <q-btn
        :label="$t('pair')"
        dense
        flat
        no-caps
        :color="sort === 'symbol' ? 'warning' : ''"
        class="text-subtitle1 f-w-800"
        @click="sort = 'symbol'"
      />
    </div>
    <div class="col-6 q-pt-xs">{{ $t('markets') }}</div>
    <div class="col-3">
      <q-btn
        :label="$t('difference')"
        dense
        flat
        no-caps
        :color="sort === 'diff' ? 'warning' : ''"
        class="text-subtitle1 f-w-800"
        @click="sort = 'diff'"
      />
    </div>
  </div>

<!--  Table-->
  <q-scroll-area style="height: calc(100vh - 200px)" ref="scrollArea">
    <arbitration-table-row
      v-for="(result, index) in sortedResults"
      :key="index"
      :result="result"
    />
  </q-scroll-area>
</div>
</template>

<script>
import { mapState } from 'vuex'
import ArbitrationTableRow from 'components/arbitration/table/arbitration-table-row'

export default {
  name: 'arbitration-table',
  components: { ArbitrationTableRow },
  computed: {
    ...mapState('arbitration', ['results']),
    sortedResults () {
      const results = JSON.parse(JSON.stringify(this.results))
      const filteredResults = results.filter(item => item.symbol?.toLowerCase().includes(this.searchText?.toLowerCase()) || item.market1?.toLowerCase().includes(this.searchText?.toLowerCase()))
      if (this.sort === 'symbol') {
        return filteredResults.sort((a, b) => a.symbol > b.symbol ? 1 : -1)
      }
      return filteredResults
    }
  },
  data () {
    return {
      sort: 'diff',
      searchText: ''
    }
  },
  watch: {
    sort () {
      this.$refs.scrollArea.setScrollPosition('vertical', 0, 500)
    },
    searchText (val) {
      if (val === null) this.searchText = ''
    }
  }
}
</script>

<style lang="sass">

</style>
