<template>
  <div class="news-grid">
    <q-infinite-scroll
      :offset="500"
      @load="onLoad"
      ref="infiniteScroll"
    >
      <div
        v-for="post in slicedNews"
        :key="post.id"
      >
        <news-list-card :post="post"/>
      </div>
    </q-infinite-scroll>
  </div>
</template>

<script>
import NewsListCard from 'components/news/news-list-card'

export default {
  name: 'news-grid',
  components: { NewsListCard },
  props: {
    news: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      slice: 10
    }
  },
  computed: {
    slicedNews () {
      return this.news.slice(0, this.slice)
    }
  },
  methods: {
    onLoad (index, done) {
      const vm = this
      if (vm.slice <= vm.slicedNews.length) {
        vm.slice += 10
      }
      setTimeout(() => {
        done()
      }, 100)
    }
  }
}
</script>

<style scoped>

</style>
