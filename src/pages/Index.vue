<template>
  <q-page>

    <portal to="title">
      <base-page-top-title title="Главная"/>
    </portal>

    <div class="pages q-pa-sm">
      <home-slider />
    </div>
    <div class="q-px-sm">
      <base-site-cards />
    </div>

    <div class="home-liders q-mt-lg q-px-sm">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <h3 class="text-h5 f-w-800 text-center q-pt-xl">Лидеры роста</h3>
          <widgets-big-liders-tabs key="home"/>
        </div>
        <div class="col-12 col-md-6">
          <h3 class="text-h5 f-w-800 text-center q-pt-xl">Лидеры падения</h3>
          <widgets-big-liders-tabs :up="false" key="home"/>
        </div>
      </div>
    </div>

    <div class="q-px-sm q-mt-xl">
      <posts-list top/>
    </div>

    <div class="q-mt-xl q-px-sm  q-pt-lg">
      <h3 class="text-h5 f-w-800 text-center">Дорожная карта проекта</h3>
      <div class="q-mt-xl">
        <roadmap />
      </div>
    </div>

  </q-page>
</template>

<script>
import HomeSlider from 'components/sliders/home-slider'
import BaseSiteCards from 'components/base-site-cards'
import WidgetsBigLidersTabs from 'components/binance-market/widgets/widgets-big-liders-tabs'
import PostsList from 'components/blog/posts-list'
import BasePageTopTitle from 'components/base-page-top-title'
import Roadmap from 'components/roadmap/roadmap'

export default {
  name: 'PageIndex',
  components: { Roadmap, BasePageTopTitle, PostsList, WidgetsBigLidersTabs, BaseSiteCards, HomeSlider },
  data () {
    return {
      pages: [
        {
          title: 'Как это работает',
          text: 'Видеообзор нашего сервиса',
          routeName: 'Binance-Market'
        },
        {
          title: 'Binance market',
          text: 'Обзор монет биржи Binance',
          routeName: 'Binance-Market'
        },
        {
          title: 'Binance spot volatility',
          text: 'Скринер изменений стоимости монет на спотовом рынке биржи Binance',
          routeName: 'Binance-Vol'
        },
        {
          title: 'Binance futures volatility',
          text: 'Скринер изменений стоимости монет на фьючерсном рынке биржи Binance',
          routeName: 'Binance-Futures-Vol'
        },
        {
          title: 'Gate spot volatility',
          text: 'Скринер изменений стоимости монет на спотовом рынке биржи Gate',
          routeName: 'Gate-Vol'
        },
        {
          title: 'Gate futures volatility',
          text: 'Скринер изменений стоимости монет на фьючерсном рынке биржи Gate',
          routeName: 'Gate-Futures-Vol'
        }
      ]
    }
  }
}
</script>

<style lang="sass">
.pages-grid
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 20px

@media screen and (max-width: 700px)
  .pages-grid
    grid-template-columns: 1fr
    grid-gap: 10px
</style>
