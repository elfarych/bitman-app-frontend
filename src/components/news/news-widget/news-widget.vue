<template>
<div class="news-widget">
  <div class="text-uppercase text-subtitle1 f-w-800 flex">
    <div>События</div>
    <a
      class="small-text text-uppercase text-warning inline-block q-pl-xs"
      style="margin-top: -3px"
      title="Источник"
      href="https://coindar.org/"
      target="_blank"
    >coindar.org</a>
  </div>
  <div class="q-mt-md">
    <news-slider />
  </div>
</div>
</template>

<script>
import NewsSlider from 'components/news/news-widget/news-slider'
export default {
  name: 'news-widget',
  components: { NewsSlider }
}
</script>

<style scoped>

</style>
