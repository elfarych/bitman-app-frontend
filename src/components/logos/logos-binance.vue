<template>
  <q-img src="../../../public/logos/binance.png" :style="imgStyle" />
</template>

<script>
export default {
  name: 'logos-binance',
  props: {
    imgStyle: {
      type: String,
      default: 'width: 30px; height: 30px'
    }
  }
}
</script>

<style scoped>

</style>
