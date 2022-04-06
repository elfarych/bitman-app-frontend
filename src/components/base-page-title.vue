<template>
  <div class="page-description">
    <h2 class="text-bold text-white market-title block" style="line-height: 1.2 !important">{{ screenerName }}</h2>
    <q-btn
      v-if="screenerLink"
      label="Регистрация на бирже"
      outline no-caps flat dense
      size="sm"
      style="margin-top: -5px"
      color="warning"
      type="a" :href="screenerLink" target="_blank"
    />
    <div v-if="screenerText" :class="screenerText ? 'q-my-sm' : ''">{{ screenerText }}</div>
    <div v-if="realTimeText" class="text-primary">Данные обновляются в режиме real-time</div>
  </div>
</template>

<script>
export default {
  name: 'base-page-title',
  props: {
    screenerText: String,
    realTimeText: {
      type: Boolean,
      default: true
    },
    screenerName: String,
    screenerLink: String
  }
}
</script>

<style lang="sass">
.market-title
  font-size: 25px
  text-decoration: none
  text-transform: uppercase
  text-shadow: 2px 2px 20px rgba(255, 255, 255, 0.5)
</style>
