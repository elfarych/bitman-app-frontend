<template>
<div class="site-footer q-px-sm">
  <q-separator />
  <div class="text-center q-mt-xl">
    <h5 class="text-h4 text-uppercase f-w-800 text-white-shadow">Bitman</h5>
    <div class="q-mt-sm text-subtitle2 f-w-400"></div>
  </div>

  <div class="q-mt-xl">
    <div class="row q-col-gutter-lg">

      <div class="col-12 col-sm-6 text-center flex justify-center">
        <div style="width: 450px; max-width: 100%">
          <arbitration-widget />
        </div>
      </div>

      <div class="col-12 col-sm-6 text-center flex justify-center">
        <div style="width: 450px; max-width: 100%">
          <airdrop-widget />
        </div>
      </div>

      <div class="col-12 col-sm-6 text-center">
        <div class="" style="max-width: 300px; margin: auto">{{ $t('footerText1') }}</div>
        <q-btn
          label="Telegram"
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
        <div class="" style="max-width: 300px; margin: auto">{{ $t('footerText2') }}
        </div>
        <q-btn
          label="Donate"
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
    <span class="text-uppercase">Bitman</span> {{ year }}. All right reserved.
  </small>

</div>
</template>

<script>

import { mapState } from 'vuex'
import ArbitrationWidget from 'components/arbitration/arbitration-widget'
import AirdropWidget from 'components/swap/airdrop-widget'

export default {
  name: 'site-footer',
  components: { AirdropWidget, ArbitrationWidget },
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
