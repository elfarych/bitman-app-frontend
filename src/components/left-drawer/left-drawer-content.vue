<template>
<div class="left-drawer-content">
  <nav>
    <q-list separator class="f-w-800 text-uppercase ">

      <q-item
        clickable
        :to="{ name: 'home' }"
        class="items-center"
        :class="$route.name === 'home' ? 'text-primary' : 'text-white'"
        tag="a"
      >
        <q-icon name="home" size="22px" class="q-mr-sm"/>
        {{ $t('homePage') }}
      </q-item>

      <q-item
        clickable
        :to="{ name: 'Binance-Market' }"
        class="items-center"
        tag="a"
      >
        <q-icon name="bar_chart" size="22px" class="q-mr-sm"/>
        {{ $t('markets') }}
      </q-item>

      <q-item
        clickable
        :to="{ name: 'Events' }"
        class="items-center"
        tag="a"
      >
        <q-icon name="event" size="22px" class="q-mr-sm"/>
        {{ $t('events') }}
      </q-item>

      <q-item
        clickable
        :to="{ name: 'News' }"
        class="items-center"
        tag="a"
      >
        <q-icon name="newspaper" size="22px" class="q-mr-sm"/>
        {{ $t('news') }}
      </q-item>

      <q-item
        clickable
        :to="{ name: 'trade' }"
        class="items-center relative-position"
        :class="$route.name === 'trade' ? 'text-primary' : 'text-white'"
        tag="a"
        title="Trade"
      >
        <q-icon name="swap_horiz" size="22px" class="q-mr-sm"/>
        {{ $t('trade') }}

        <div class="bg-warning absolute-bottom-right text-dark q-pa-xs rounded-borders small-text q-ma-xs"><q-icon name="crisis_alert" size="13px" style="margin-top: -2px"/> Big Airdrop</div>
      </q-item>

      <q-item
        clickable
        :to="{ name: 'Arbitration' }"
        class="items-center"
        tag="a"
      >
        <q-icon name="ssid_chart" size="22px" class="q-mr-sm"/>
        {{ $t('arbitration') }}

        <div class="absolute-bottom-right text-dark q-pa-xs rounded-borders small-text q-ma-xs text-warning"><q-icon name="query_stats" size="13px" style="margin-top: -2px"/> Screener</div>
      </q-item>

      <q-item
        class="items-center text-grey-7"
        style="background: #131722"
      >
        {{ $t('project') }}
      </q-item>

<!--      <q-item-->
<!--        clickable-->
<!--        :to="{ name: 'Blog' }"-->
<!--        class="items-center"-->
<!--        tag="a"-->
<!--        title="Новости проекта Bitman"-->
<!--      >-->
<!--        <q-icon name="newspaper" size="22px" class="q-mr-sm"/>-->
<!--        Наш блог-->
<!--      </q-item>-->

      <q-item
        clickable
        :to="{ name: 'Roadmap' }"
        class="items-center"
        tag="a"
        title="Дорожная карта проекта Bitman"
      >
        <q-icon name="signpost" size="22px" class="q-mr-sm"/>
        Roadmap
      </q-item>

      <q-item
        clickable
        :to="{ name: 'Donat' }"
        class="items-center"
        tag="a"
        title="Помощь проекту Bitman"
      >
        <q-icon name="currency_bitcoin" size="22px" class="q-mr-sm"/>
        {{ $t('donate') }}
      </q-item>

      <q-item
        clickable
        :to="{ name: 'Contacts' }"
        class="items-center"
        tag="a"
        title="Наши контакты"
      >
        <q-icon name="alternate_email" size="22px" class="q-mr-sm"/>
        {{ $t('contacts') }}
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

<!--      <q-item-->
<!--        class="items-center text-grey-7"-->
<!--        style="background: #131722"-->
<!--      >-->
<!--        {{ $t('additionally') }}-->
<!--      </q-item>-->

<!--      <q-item-->
<!--        clickable-->
<!--        :to="{ name: 'Donat' }"-->
<!--        class="items-center"-->
<!--        tag="a"-->
<!--        title="Помощь проекту Bitman"-->
<!--      >-->
<!--        <q-icon name="currency_bitcoin" size="22px" class="q-mr-sm"/>-->
<!--        {{ $t('donate') }}-->
<!--      </q-item>-->

<!--      <q-item-->
<!--        clickable-->
<!--        :to="{ name: 'New-fitch' }"-->
<!--        class="items-center"-->
<!--        tag="a"-->
<!--        title="Прадлагайте новые интересные фичи и мы добавим их в нашу платформу"-->
<!--      >-->
<!--        <q-icon name="addchart" size="22px" class="q-mr-sm"/>-->
<!--        Предложить фичу-->
<!--      </q-item>-->

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
