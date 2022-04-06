<template>
<div class="site-footer q-px-sm">
  <q-separator />
  <div class="text-center q-mt-xl">
    <h5 class="text-h4 text-uppercase f-w-800 text-white-shadow">Bitman</h5>
    <div class="q-mt-sm text-subtitle2 f-w-400" v-html="siteInfo.site_text"></div>
  </div>

  <div class="q-mt-xl">
    <div class="row q-col-gutter-lg">
      <!--    <div class="col-12 col-sm-4 text-center">-->
      <!--      <router-link :to="{ name: 'home' }" class="text-secondary text-subtitle2 f-w-600 block">-->
      <!--        Главная-->
      <!--      </router-link>-->

      <!--      <router-link :to="{ name: 'Binance-Market' }" class="text-secondary text-subtitle2 f-w-600 block q-mt-sm">-->
      <!--        Рынок-->
      <!--      </router-link>-->

      <!--      <router-link :to="{ name: 'Binance-Vol' }" class="text-secondary text-subtitle2 f-w-600 block q-mt-sm">-->
      <!--        Скринер волатильности-->
      <!--      </router-link>-->

      <!--      <router-link :to="{ name: 'Blog' }" class="text-secondary text-subtitle2 f-w-600 block q-mt-sm">-->
      <!--        Блог-->
      <!--      </router-link>-->

      <!--      <router-link :to="{ name: 'Roadmap' }" class="text-secondary text-subtitle2 f-w-600 block q-mt-sm">-->
      <!--        Дорожная карта-->
      <!--      </router-link>-->

      <!--      <router-link :to="{ name: 'Contacts' }" class="text-secondary text-subtitle2 f-w-600 block q-mt-sm">-->
      <!--        Контакты-->
      <!--      </router-link>-->
      <!--    </div>-->

      <div class="col-12 col-sm-6 text-center">
        <div class="">Принимайте участие в развитии проекта,<br> <span class="f-w-800">нам очень важно Ваше мнение.</span><br>
          Мы будем <span class="f-w-800">обсуждать с Вами</span> все,<br> что планируем и делаем.
        </div>
        <q-btn
          label="Telegram канал"
          color="primary"
          icon="telegram"
          text-color="dark"
          type="a"
          target="_blank"
          :href="siteInfo.main_tg_url"
          class="f-w-800 rounded-borders q-py-sm q-px-md q-mt-md"
        />
      </div>
      <div class="col-12 col-sm-6 text-center">
        <div class="">Мы создали <span class="f-w-800">полностью бесплатную платформу.<br></span>
          Будем очень признательны,<br> если Вы решите <br><span class="f-w-800">поблагодарить нас. </span>
        </div>
        <q-btn
          label="Помощь проекту"
          color="primary"
          icon="currency_bitcoin"
          text-color="dark"
          :to="{ name: 'Donat' }"
          class="f-w-800 rounded-borders q-py-sm q-px-md q-mt-md"
        />
      </div>
    </div>
  </div>

  <small class="q-py-lg q-mt-xl block text-center">
    <span class="text-uppercase">Bitman</span> {{ year }}. Все права зашишены.
  </small>

</div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'site-footer',
  computed: {
    ...mapState('siteInfo', ['siteInfo']),
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>

</style>
