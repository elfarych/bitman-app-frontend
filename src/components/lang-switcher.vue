<template>
<div class="lang-switcher">
  <q-btn-group unelevated>
    <q-btn
      label="EN"
      dense unelevated
      class="q-px-xs f-w-800"
      :color="$i18n.locale === 'en-us' ? 'secondary' : ''"
      @click="switchLang('en-us')"
    />
    <q-btn
      label="RU"
      dense unelevated
      :color="$i18n.locale === 'ru-ru' ? 'secondary' : ''"
      class="q-px-xs f-w-800"
      @click="switchLang('ru-ru')"
    />
  </q-btn-group>
</div>
</template>

<script>
export default {
  name: 'lang-switcher',
  methods: {
    switchLang (lang) {
      this.$i18n.locale = lang
      localStorage.setItem('lang', lang)
    }
  },
  created () {
    this.$i18n.locale = this.$route.query.lang || localStorage.getItem('lang') || 'en-us'
    if (this.$route.query.lang) localStorage.setItem('lang', this.$route.query.lang)
  }
}
</script>

<style scoped>

</style>
