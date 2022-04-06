<template>
<q-page class="q-pa-sm">
  <portal to="title">
    <base-page-top-title title="Блог"/>
  </portal>

  <base-page-title :real-time-text="false" :screener-name="post.title"/>

  <main>
    <section>
      <p class="text-subtitle1 f-w-600 q-mt-md">{{ post.text }}</p>
    </section>
    <section v-if="post.video_url" class="q-mt-md">
      <q-video
        class="rounded-borders"
        :ratio="16/9"
        :src="`https://www.youtube.com/embed/${post.video_url}`"
      />
    </section>
    <section v-else>
      <q-img
        :src="post.image"
        style="max-height: 50vh"
      />
    </section>

    <section>
      <div class="q-mt-md" v-html="post.content"></div>
    </section>
  </main>

</q-page>
</template>

<script>
import BasePageTopTitle from 'components/base-page-top-title'
import BasePageTitle from 'components/base-page-title'
import { mapState } from 'vuex'
export default {
  name: 'page-blog-detail',
  components: { BasePageTitle, BasePageTopTitle },
  computed: {
    ...mapState('blog', ['post'])
  },
  preFetch ({ store, currentRoute }) {
    return store.dispatch('blog/loadPost', currentRoute.params.slug)
  }
}
</script>

<style scoped>

</style>
