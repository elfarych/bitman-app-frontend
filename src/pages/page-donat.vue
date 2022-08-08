<template>
<q-page class="q-pa-sm">

  <portal to="title">
  <base-page-top-title title="Donate"/>
  </portal>

  <base-page-title :real-time-text="false" screener-name="Donate"/>

  <div class="q-mt-md f-w-600">
    You can transfer cryptocurrency to any wallet from the list.<br>
    Thank you!
  </div>

  <div>
    <div>
      <q-item
        v-for="wallet in filteredWallets"
        :key="wallet.id"
        class="q-mt-sm rounded-borders q-pa-md column bg-dark"
        clickable
        @click="copy(wallet.address)"
      >
        <div class="flex">
          <q-img :src="wallet.icon" style="width:30px"/>
          <div class="q-ml=md text-subtitle1 text-uppercase f-w-800 q-ml-sm">{{ wallet.token }}</div>
        </div>

        <div class="text-grey-6 q-mt-sm">Chain: <span class="text-primary f-w-600">{{ wallet.chain }}</span></div>
        <div class="text-subtitle2 text-grey-6">Address: <span class="text-white f-w-600">{{ wallet.address }}</span> <q-icon name="content_copy" size="16px" style="margin-left: 5px; margin-top: -5px"/></div>

        <q-tooltip content-class="bg-primary text-dark f-w-600">
          Copy address
        </q-tooltip>
      </q-item>
    </div>
  </div>
</q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BasePageTopTitle from 'components/base-page-top-title'
import BasePageTitle from 'components/base-page-title'
import { copyToClipboard } from 'quasar'
import notifier from 'src/utils/notifier'
export default {
  name: 'page-donat',
  components: { BasePageTitle, BasePageTopTitle },
  computed: {
    ...mapState('siteInfo', ['donateWallets']),
    filteredWallets () {
      return this.donateWallets.filter(item => item.token.toLowerCase().includes(this.searchText.toLowerCase()))
    }
  },
  methods: {
    ...mapActions('siteInfo', ['loadDonateWallets']),
    copy (address) {
      copyToClipboard(address)
        .then(() => {
          notifier('Copied.', 'primary')
        })
        .catch(() => {
          notifier('Some error.')
        })
    }
  },
  data () {
    return {
      searchText: ''
    }
  },
  created () {
    this.loadDonateWallets()
  }
}
</script>

<style scoped>

</style>
