<template>
<q-page class="q-pa-sm relative-position">
  <base-page-title :real-time-text="false" screener-name="Профиль"/>
  <portal to="title">
    <base-page-top-title title="Профиль"/>
  </portal>

  <div v-if="trader" class="q-mt-lg">
    <trader-profile-main-info />
  </div>

<!--  Coming sun -->
  <div class="absolute-full bg-dark flex flex-center">
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
import BasePageTitle from 'components/base-page-title'
import BasePageTopTitle from 'components/base-page-top-title'
import TraderProfileMainInfo from 'components/trader/profile/trader-profile-main-info'

export default {
  name: 'profile',
  components: { TraderProfileMainInfo, BasePageTopTitle, BasePageTitle },
  computed: {
    ...mapState('trader', ['user', 'trader'])
  },
  data () {
    return {
      comingSun: true
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
</script>

<style scoped>

</style>
