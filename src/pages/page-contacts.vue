<template>
<q-page class="q-pa-sm">
  <portal to="title">
    <base-page-top-title title="Наши контакты"/>
  </portal>

  <base-page-title :real-time-text="false" screener-name="Наши контакты"/>

  <div class="q-mt-lg">
    <q-item
      tag="a"
      target="_blank"
      :href="`mailto:${siteInfo.mail}`"
      clickable
      class="rounded-borders items-center text-subtitle2"
    >
      <span class="f-w-600 q-mr-sm">Email: {{ siteInfo.mail }}</span>
    </q-item>

    <q-item
      tag="a"
      target="_blank"
      :href="`${siteInfo.main_tg_url}`"
      clickable
      class="rounded-borders items-center text-subtitle2"
    >
      <span class="f-w-600 q-mr-sm">Telegram канал проекта: @Bitmanapp</span>
    </q-item>

    <q-item
      tag="a"
      target="_blank"
      :href="`${siteInfo.self_tg_url}`"
      clickable
      class="rounded-borders items-center text-subtitle2"
    >
      <span class="f-w-600 q-mr-sm">Telegram чат: @Bitmancommunication</span>
    </q-item>

    <q-item
      v-if="siteInfo.whatsapp"
      tag="a"
      target="_blank"
      :href="`https://wa.me/${siteInfo.whatsapp.split(' ').join('')}`"
      clickable
      class="rounded-borders items-center text-subtitle2"
    >
      <span class="f-w-600 q-mr-sm">Whatsapp:</span> <span class=" text-uppercase">{{ siteInfo.whatsapp }}</span>
    </q-item>
  </div>
</q-page>
</template>

<script>
import BasePageTopTitle from 'components/base-page-top-title'
import BasePageTitle from 'components/base-page-title'
import { mapState } from 'vuex'
export default {
  name: 'page-contacts',
  components: { BasePageTitle, BasePageTopTitle },
  computed: {
    ...mapState('siteInfo', ['siteInfo'])
  }
}
</script>

<style scoped>

</style>
