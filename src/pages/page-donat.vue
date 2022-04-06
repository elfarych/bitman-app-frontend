<template>
<q-page class="q-pa-sm">

  <portal to="title">
  <base-page-top-title title="Помощь проекту"/>
  </portal>

  <base-page-title :real-time-text="false" screener-name="Помощь проекту"/>

  <div class="q-mt-md f-w-600">
    Вы можете перевести криптовалюту на любой кошелек из списка.<br>
    Благодарим Вас за помощь проекту!
  </div>

  <q-input
    class="q-my-md"
    label="Поиск монеты"
    style="max-width: 100%; width: 500px"
    v-model="searchText"
    outlined dense clearable
    @clear="searchText = ''"
  ><template v-slot:prepend><q-icon name="search"/></template>
  </q-input>

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

        <div class="q-ml=md text-grey-6 f-w-800 q-mt-sm">Сеть: <span class="text-primary">{{ wallet.chain }}</span></div>
        <div class="q-ml=md text-subtitle2 text-grey-6 f-w-800">Адрес: <span class="text-white">{{ wallet.address }}</span> <q-icon name="content_copy" size="16px" style="margin-left: 5px; margin-top: -5px"/></div>

        <q-tooltip content-class="bg-primary text-dark f-w-600">
          Скопировать адрес кошелька
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
          notifier('Адрес скопирован в буфер.', 'primary')
        })
        .catch(() => {
          notifier('Не удалось скопировать адрес.')
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
