<template>
  <q-page class="q-pa-sm relative-position">
    <portal to="title">
      <base-page-top-title :title="$t('arbitration')" class="text-capitalize"/>
    </portal>

    <base-page-title :real-time-text="false" :screener-name="$t('arbitration')" screener-text="BETTA version"/>

    <div class="absolute-top-right q-ma-sm">
      <q-btn
        icon-right="refresh"
        color="secondary"
        text-color="dark"
        class="f-w-600"
        unelevated no-caps
        :label="$t('reload')"
        :loading="loading"
        :disable="reloadDisable"
        @click="reloadData"
      />
    </div>

    <section class="q-mt-md">
      <arbitration-table />
    </section>
  </q-page>
</template>

<script>
import BasePageTopTitle from 'components/base-page-top-title'
import BasePageTitle from 'components/base-page-title'
import { mapActions } from 'vuex'
import ArbitrationTable from 'components/arbitration/table/arbitration-table'
import notifier from 'src/utils/notifier'

let reloader

export default {
  name: 'page-arbitration',
  components: { ArbitrationTable, BasePageTitle, BasePageTopTitle },
  methods: {
    ...mapActions('arbitration', ['loadArbitrationResults']),
    async reloadData () {
      this.loading = true
      await this.loadArbitrationResults()
      this.loading = false
      this.reloadDisable = true
      notifier('Arbitration list updated.', 'positive')
      setTimeout(() => {
        this.reloadDisable = false
      }, 10000)
    }
  },
  beforeDestroy () {
    clearInterval(reloader)
  },
  created () {
    this.loadArbitrationResults()
    reloader = setInterval(() => {
      this.loadArbitrationResults()
    }, 1000 * 60)
  },
  data () {
    return {
      reloadDisable: false,
      loading: false
    }
  }
}
</script>

<style scoped>

</style>
