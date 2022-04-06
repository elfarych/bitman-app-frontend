<template>
<q-page class="q-pa-sm">
  <portal to="title">
    <base-page-top-title title="Новости проекта"/>
  </portal>

  <base-page-title :real-time-text="false" screener-name="Наш блог"/>

  <div class="q-mt-lg">
    <posts-list />
  </div>
</q-page>
</template>

<script>
import BasePageTopTitle from 'components/base-page-top-title'
import BasePageTitle from 'components/base-page-title'
import PostsList from 'components/blog/posts-list'
export default {
  name: 'page-blog',
  components: { PostsList, BasePageTitle, BasePageTopTitle }
}
</script>

<style scoped>

</style>
