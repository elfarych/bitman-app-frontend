<template>
<div class="coins-domination q-mt-lg">
<!--  <div class="text-subtitle1 text-uppercase f-w-800">Категории</div>-->
  <coin-categories-slider />
</div>
</template>

<script>
import CoinCategoriesSlider from 'components/coins/coin-categories/coins-categories-slider'
export default {
  name: 'coin-categories',
  components: { CoinCategoriesSlider }
}
</script>

<style scoped>

</style>
