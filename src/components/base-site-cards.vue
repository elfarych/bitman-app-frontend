<template>
<div class="base-site-cards">
  <div class="row q-col-gutter-sm">
    <div class="col-12 col-sm-6">
      <div class="site-card text-center fit">
        <h3 class="text-h5 f-w-800">Рынок</h3>
        <div class="q-mt-sm">Обзор рынка криптовалют <br> с широким набором данных и инструментов</div>

        <div class="q-mt-md">
          <q-btn
            label="Перейти"
            color="warning"
            text-color="dark"
            class="f-w-800 q-px-md" unelevated
            :to="{ name: 'Binance-Market' }"
          />
        </div>
      </div>
    </div>

    <div class="col-12 col-sm-6">
      <div class="site-card text-center">
        <h3 class="text-h5 f-w-800">Волатильность</h3>
        <div class="q-mt-sm">Не упускайте движения рынка. <br> Скриннер волатильности с удобной фильтрацией</div>
        <div class="q-mt-md">
          <q-btn
            label="Перейти"
            color="warning"
            text-color="dark"
            class="f-w-800 q-px-md" unelevated
            :to="{ name: 'Binance-Vol' }"
          />
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'base-site-cards'
}
</script>

<style lang="sass">
.site-card
  padding: 20px 10px
  //background: $dark
</style>
