<template>
  <div class="q-pa-md">
    <div class="main-page-header text-center">
      <h1 class="f-w-800 text-uppercase text-primary text-white-shadow">Bitman</h1>
      <h2 class="q-mt-md">Проект для криптоманов от криптомана.</h2>

      <div class="home-grid q-mt-xl">
        <div class="rounded-borders q-pa-md primary-borders">
          <div class="f-w-800 text-h6 text-uppercase text-primary">Сейчас</div>
          <div class="text-subtitle1">информационно-аналитический проект</div>
        </div>

        <div class="rounded-borders q-pa-md primary-borders">
          <div class="f-w-800 text-h6 text-uppercase text-primary">Скоро</div>
          <div class="text-subtitle1">социальная сеть и информационно-аналитическая платформа</div>
        </div>
      </div>
    </div>
    <div class="q-mt-xl text-center">
      <div class="text-subtitle1">Принимайте участие в развитии проекта, <span class="text-secondary">нам очень важно Ваше мнение.</span>
        <br>Мы будем <span class="text-secondary">обсуждать с Вами</span> все, что мы планируем и делаем.
      </div>
      <q-btn
        label="Присоединиться к нам"
        color="primary"
        icon="telegram"
        text-color="dark"
        class="f-w-800 rounded-borders q-py-sm q-px-md q-mt-md white-shadow"
      />
    </div>
  </div>

</template>

<script>
export default {
  name: 'about-us'
}
</script>

<style lang="sass">
.home-grid
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 20px

.main-page-header
  h1
    font-size: 50px
    line-height: 1.3

  h2
    font-size: 20px
    line-height: 1.3

  h3
    font-size: 20px
    line-height: 1

@media screen and (max-width: 700px)
  .home-grid
    grid-template-columns: 1fr

  .main-page-header
    h1
      font-size: 30px

    h2
      font-size: 18px

    h3
      font-size: 16px
      line-height: 1.2
</style>
