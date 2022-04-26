<template>
  <q-page class="q-pa-sm">
    <portal to="title">
      <base-page-top-title title="Копитрейдинг"/>
    </portal>

    <base-page-title :real-time-text="false" screener-name="Копитрейдинг"/>

    <section>
      <q-btn
        label="Узнать подробнее"
        color="primary"
        text-color="dark"
        no-caps
        class="q-mt-md f-w-800"
      />
    </section>

    <section class="q-mt-xl">
      <div class="row q-col-gutter-md">
        <div
          v-for="result in results"
          :key="result.id"
          class="col-12 col-sm-6"
        >
          <partners-online-trader-copy-result-card :result="result"/>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import BasePageTopTitle from 'components/base-page-top-title'
import BasePageTitle from 'components/base-page-title'
import errorHandler from 'src/utils/error-handler'
import config from 'src/config'
import notifier from 'src/utils/notifier'
import PartnersOnlineTraderCopyResultCard
from 'components/partners/online-trader/partners-online-trader-copy-result-card'
export default {
  name: 'page-online-trader-copy-results',
  components: { PartnersOnlineTraderCopyResultCard, BasePageTitle, BasePageTopTitle },
  data () {
    return {
      results: []
    }
  },
  methods: {
    async loadResults () {
      try {
        this.results = await this.$axios
          .get(`${config.socialServerURI}/partners/copy_trade_results/`)
          .then(res => res.data.results)
      } catch (e) {
        notifier('Не удалось загрузить контент. Попробуйте обновить страницу.', 'negative')
        errorHandler(e)
      }
    }
  },
  async created () {
    await this.loadResults()
  }
}
</script>

<style scoped>

</style>
