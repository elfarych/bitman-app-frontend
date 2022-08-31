<template>
  <q-item
    class="arbitration-widget q-pa-md rounded-borders-xl column full-width text-warning text-dark relative-position"
    clickable
    :to="{ name: 'Arbitration' }"
  >
    <div class="text-h5 f-w-800 text-uppercase tex"><q-icon name="ssid_chart" size="25px" style="margin-top: -5px"/> {{ $t('screenerWidgetTitle') }}</div>
    <div>{{ $t('screenerWidgetText') }}</div>
  </q-item>
</template>

<script>
export default {
  name: 'arbitration-widget'
}
</script>

<style lang="sass">
.arbitration-widget
  border: 1px solid $warning
</style>
