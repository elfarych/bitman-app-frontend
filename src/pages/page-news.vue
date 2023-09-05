<template>
  <q-page class="q-pa-sm relative-position">
    <portal to="title">
      <base-page-top-title :title="$t('news')" class="text-capitalize"/>
    </portal>

    <base-page-title :real-time-text="false" :screener-name="$t('news')"/>

    <section class="q-mt-lg">
      <news-grid :news="news"/>
    </section>
  </q-page>
</template>

<script>
import BasePageTopTitle from 'components/base-page-top-title'
import BasePageTitle from 'components/base-page-title'
import { mapActions, mapState } from 'vuex'
import NewsGrid from 'components/news/news-grid'
export default {
  name: 'page-news',
  components: { NewsGrid, BasePageTitle, BasePageTopTitle },
  computed: {
    ...mapState('news', ['news'])
  },
  methods: {
    ...mapActions('news', ['loadNews'])
  },
  created () {
    this.loadNews()
  }
}
</script>

<style scoped>

</style>
