<template>
<q-img src="../../../public/logos/gate.png" :style="imgStyle" />
</template>

<script>
export default {
  name: 'logos-gate',
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
