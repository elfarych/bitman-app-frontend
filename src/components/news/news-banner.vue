<template>
  <router-link :to="{ name: 'News' }" class="news-banner banners relative-position block text-white">
    <q-img :src="image" class="fit rounded-borders-xl">
      <template v-slot:loading>
        <q-skeleton class="fit"/>
      </template>
    </q-img>
    <div class="absolute-bottom-left q-ma-sm" style="z-index: 10">
      <div class="text-h5 f-w-800 text-uppercase ">{{ $t('news') }}</div>
      <div class="text-dark f-w-800">{{ $t('newsText') }}</div>
    </div>
  </router-link>
</template>

<script>
import newsBanner from 'src/assets/news.jpg'
export default {
  name: 'news-banner',
  computed: {
    image () {
      return newsBanner
    }
  }
}
</script>

<style lang="sass">

</style>
