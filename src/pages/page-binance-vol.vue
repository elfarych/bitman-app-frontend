<template>
  <q-page>
    <portal to="title">
      <base-page-top-title title="Скринер"/>
    </portal>
    <volatility-tickers screener-name="Скринер волатильности" screener-link="https://accounts.binance.com/ru/register?ref=368026154"/>
  </q-page>
</template>

<script>
import BasePageTopTitle from 'components/base-page-top-title'
import VolatilityTickers from 'components/volatility/volatility-tickers'
export default {
  name: 'page-binance-vol',
  components: { VolatilityTickers, BasePageTopTitle }
}
</script>

<style scoped>

</style>
