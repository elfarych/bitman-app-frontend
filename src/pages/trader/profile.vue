<template>
<q-page class="q-pa-sm relative-position">
  <portal to="title">
    <base-page-top-title title="Профиль"/>
  </portal>

  <div>
    <trader-profile-main-info />
  </div>

  <div class="q-mt-md">
    <trader-profile-tabs />
  </div>

<!--  Coming sun -->
  <div v-if="comingSun" class="absolute-full bg-dark flex flex-center">
    <div class="text-subtitle1 f-w-800 text-center">
      <q-icon name="code" size="50px" color="warning"/>
      <div>
        Данный раздел в разработке
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
import { mapState } from 'vuex'
import BasePageTopTitle from 'components/base-page-top-title'
import TraderProfileMainInfo from 'components/trader/profile/trader-profile-main-info'
import TraderProfileTabs from 'components/trader/profile/trader-profile-tabs'

export default {
  name: 'profile',
  components: { TraderProfileTabs, TraderProfileMainInfo, BasePageTopTitle },
  computed: {
    ...mapState('trader', ['user', 'trader'])
  },
  data () {
    return {
      comingSun: false
    }
  },
  mounted () {
    setTimeout(() => {
      if (!this.user) {
        this.$router.replace({
          name: 'Auth'
        })
      }
    }, 5000)
  }
}

// avatar: "http://192.168.0.199:8000/media/users/165344-astrofotografiya_luny-astrofotografiya-lunnyj_kalendar-luna_iz_kosmosa-atmosfera-7680x4320_BatIORO.jpg"
// cases: []
// chat_banned: false
// date: "2022-04-26T17:03:49.612783+06:00"
// email: "test1@mail.ru"
// for_referals_paid_sum: 0
// id: 6
// name: "Эльдар Фаритович Хайбулов"
// referals: []
// update: "2022-04-26T20:12:40.201541+06:00"
// user: 13
// watchlist: null
</script>

<style scoped>

</style>
