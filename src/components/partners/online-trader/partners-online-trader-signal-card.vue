<template>
<div class="partners-online-trader-signal-card">
  <div>
    <small>{{ $dayjs(signal.date).format('DD.MM.YYYY в hh:mm') }}</small>
    <div class="text-primary f-w-800 text-subtitle1">{{ signal.token }}</div>
    <div>Тип ордера: {{ signal.order_type }}</div>
    <div>Take profit: {{ signal.take_profit }}</div>
    <div>Stop loss: {{ signal.stop_loss }}</div>
    <q-separator class="q-mt-sm"/>
    <div class="q-mt-sm">{{ signal.comment }}</div>
  </div>

</div>
</template>

<script>
export default {
  props: {
    signal: {
      type: Object,
      default: () => {}
    }
  },
  name: 'partners-online-trader-signal-card'
}
</script>

<style scoped>

</style>
