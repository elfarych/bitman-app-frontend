<template>
<q-page class="q-pa-sm">
  <portal to="title">
    <base-page-top-title title="Сигналы"/>
  </portal>

  <base-page-title :real-time-text="false" screener-name="Торовые сигналы"/>

  <section>
    <q-btn
      label="Перейти в Telegram канал"
      color="primary"
      text-color="dark"
      no-caps
      class="q-mt-md f-w-800"
    />
  </section>

  <section>
    <div class="q-mt-xl">
      <div
        v-for="signal in signals"
        :key="signal.id"
        class="bg-dark q-mt-md q-pa-md rounded-borders"
      >
        <partners-online-trader-signal-card :signal="signal"/>
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
import PartnersOnlineTraderSignalCard from 'components/partners/online-trader/partners-online-trader-signal-card'
export default {
  name: 'page-online-trader-signals',
  components: { PartnersOnlineTraderSignalCard, BasePageTitle, BasePageTopTitle },
  data () {
    return {
      signals: []
    }
  },
  methods: {
    async loadSignals () {
      try {
        this.signals = await this.$axios
          .get(`${config.socialServerURI}/partners/trade_siglnals/`)
          .then(res => res.data.results)
      } catch (e) {
        notifier('Не удалось загрузить сигналы. Попробуйте обновить страницу.', 'negative')
        errorHandler(e)
      }
    }
  },
  async created () {
    await this.loadSignals()
  }
}
</script>

<style scoped>

</style>
