<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn dense unelevated icon="menu" @click="left = !left" color="primary" outline class="rounded-borders"/>

        <div>
          <h1
            :style="`opacity: ${logoOpacity}; display: ${titleOpacity ? 'none' : 'inline-block'}`"
            class="text-h5 f-w-800 text-uppercase cursor-pointer q-ml-md relative-position"
            @click="goToHome"
          >
            Bitman
            <span class="vix-logo">
              {{ vix }}
              <q-tooltip>
                Индекс страха и жадности биткоина
              </q-tooltip>
            </span>
          </h1>
          <div
            class="text-bold q-ml-md"
            :class="$mobile ? 'text-subtitle1' : 'text-h5'"
            :style="`opacity: ${titleOpacity}; height: ${titleOpacity ? 'auto' : '0px'}; display: ${titleOpacity ? 'block' : 'none'}`"
          >
            <portal-target name="title"></portal-target>
          </div>
        </div>

        <q-space />

        <q-slide-transition>
          <q-btn
            v-if="showVolatilityFilter"
            :label="!$mobile ? 'Фильтр' : ''"
            icon="tune"
            class="text-bold rounded-borders"
            no-caps flat
            :dense="$mobile"
            @click="showFilters"
          />
        </q-slide-transition>
        <portal-target name="top-bar-right"></portal-target>
        <div><trader-top-btn /></div>

      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <!-- drawer content -->
      <left-drawer-tabs />
    </q-drawer>

    <q-page-container v-scroll="scrolled">
      <router-view/>
      <site-footer class="q-mt-xs q-pt-xl"/>
    </q-page-container>

    <volatility-tickers-filter />
    <chart-popup />
    <chart-hover />

    <q-btn
      icon="north"
      style="position: fixed; bottom: 5px; right: 5px; z-index: 1000;"
      :style="`opacity: ${titleOpacity}`"
      color="secondary"
      padding="10px"
      class="rounded-borders"
      @click="scrollToTop"
    />
  </q-layout>
</template>

<script>
import VolatilityTickersFilter from 'components/volatility/volatility-tickers-filter'
import ChartPopup from 'components/chart/chart-popup'
import ChartHover from 'components/chart/chart-hover'
import LeftDrawerTabs from 'components/left-drawer/left-drawer-tabs'
import { mapState } from 'vuex'
import SiteFooter from 'components/footer/site-footer'
import TraderTopBtn from 'components/trader/trader-top-btn'

export default {
  components: { TraderTopBtn, SiteFooter, LeftDrawerTabs, ChartHover, ChartPopup, VolatilityTickersFilter },
  data () {
    return {
      left: false,
      titleOpacity: 0,
      logoOpacity: 1
    }
  },
  computed: {
    ...mapState('info', ['vix']),
    showVolatilityFilter () {
      return this.$route.path.includes('volatility')
    }
  },
  methods: {
    showFilters () {
      const vm = this
      vm.$router.replace({
        query: {
          ...vm.$route.query,
          filter: vm.$route.query.filter ? undefined : 1
        }
      })
    },
    goToHome () {
      this.$router.push('/')
    },
    scrolled (position) {
      if (position / 1000 <= 1) {
        this.titleOpacity = position / 1000
        this.logoOpacity = this.logoOpacity - position
      } if (position === 0) {
        this.logoOpacity = 1
      }
    },
    scrollToTop () {
      document.querySelector('body').scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  }
}
</script>

<style lang="sass">
.vix-logo
  position: absolute
  top: -5px
  right: -20px
  font-size: 14px
  font-weight: 600
  display: flex
  align-items: center
</style>
