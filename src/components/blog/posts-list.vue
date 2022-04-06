<template>
<div class="posts-list">
  <div class="row q-col-gutter-md">
    <div
      v-for="post in filteredPosts"
      :key="post.id"
      class="col-12 col-sm-6"
    >
      <post-card :post="post" class="q-mt-sm"/>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import PostCard from 'components/blog/post-card'

export default {
  name: 'posts-list',
  components: { PostCard },
  props: {
    top: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('blog', ['posts']),
    filteredPosts () {
      if (this.top) return this.posts.filter(item => item.top)

      return this.posts
    }
  }
}
</script>

<style scoped>

</style>
