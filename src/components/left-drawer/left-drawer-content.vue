<template>
<div class="left-drawer-content">
  <nav>
    <q-list separator class="f-w-800 text-uppercase ">
      <q-item
        clickable
        to="/"
        class="items-center"
        :class="$route.name === 'home' ? 'text-primary' : 'text-white'"
        tag="a"
        title="Главная страница"
      >
        <q-icon name="home" size="22px" class="q-mr-sm"/>
        Главная
      </q-item>

      <q-item
        clickable
        :to="{ name: 'Binance-Market' }"
        class="items-center"
        tag="a"
        title="Полная информация о монетах"
      >
        <q-icon name="bar_chart" size="22px" class="q-mr-sm"/>
        Рынок
      </q-item>

      <q-item
        clickable
        :to="{ name: 'Binance-Vol' }"
        class="items-center"
        tag="a"
        title="Скринер волатильности монет"
      >
        <q-icon name="percent" size="22px" class="q-mr-sm"/>
        Скринер волатильности
      </q-item>

      <q-item
        class="items-center text-grey-7"
        style="background: #131722"
      >
        О проекте
      </q-item>

      <q-item
        clickable
        :to="{ name: 'Blog' }"
        class="items-center"
        tag="a"
        title="Новости проекта Bitman"
      >
        <q-icon name="newspaper" size="22px" class="q-mr-sm"/>
        Наш блог
      </q-item>

      <q-item
        clickable
        :to="{ name: 'Roadmap' }"
        class="items-center"
        tag="a"
        title="Дорожная карта проекта Bitman"
      >
        <q-icon name="signpost" size="22px" class="q-mr-sm"/>
        Дорожная карта
      </q-item>

      <q-item
        clickable
        :to="{ name: 'Contacts' }"
        class="items-center"
        tag="a"
        title="Наши контакты"
      >
        <q-icon name="alternate_email" size="22px" class="q-mr-sm"/>
        Контакты
      </q-item>

<!--      <q-item-->
<!--        class="items-center text-grey-7"-->
<!--        style="background: #131722"-->
<!--      >-->
<!--        Наши партнеры-->
<!--      </q-item>-->
<!--      <q-item-->
<!--        clickable-->
<!--        :to="{ name: 'OnlineTraderSignals' }"-->
<!--        class="items-center relative-position"-->
<!--        tag="a"-->
<!--        title="Торговые сигналы"-->
<!--      >-->
<!--        <q-icon name="auto_graph" size="22px" class="q-mr-sm"/>-->
<!--        Торговые сигналы-->
<!--        <small class="block text-warning absolute-top-right q-pr-xs">Все рынки</small>-->
<!--      </q-item>-->

<!--      <q-item-->
<!--        clickable-->
<!--        :to="{ name: 'OnlineTraderCopyResults' }"-->
<!--        class="items-center relative-position"-->
<!--        tag="a"-->
<!--        title="Копитрейдинг"-->
<!--      >-->
<!--        <q-icon name="stacked_line_chart" size="22px" class="q-mr-sm"/>-->
<!--        Копитрейдинг-->
<!--        <small class="block text-warning absolute-top-right q-pr-xs">Рекомендуем</small>-->
<!--      </q-item>-->

      <q-item
        class="items-center text-grey-7"
        style="background: #131722"
      >
        Дополнительно
      </q-item>

      <q-item
        clickable
        :to="{ name: 'Donat' }"
        class="items-center"
        tag="a"
        title="Помощь проекту Bitman"
      >
        <q-icon name="currency_bitcoin" size="22px" class="q-mr-sm"/>
        Помощь проекту
      </q-item>

      <q-item
        clickable
        :to="{ name: 'New-fitch' }"
        class="items-center"
        tag="a"
        title="Прадлагайте новые интересные фичи и мы добавим их в нашу платформу"
      >
        <q-icon name="addchart" size="22px" class="q-mr-sm"/>
        Предложить фичу
      </q-item>

    </q-list>
  </nav>

</div>
</template>

<script>
export default {
  name: 'left-drawer-content',
  data () {
    return {
      links: ''
    }
  }
}
</script>

<style scoped>

</style>
