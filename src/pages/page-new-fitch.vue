<template>
<q-page class="q-pa-sm">
  <portal to="title">
    <base-page-top-title title="Новая фича"/>
  </portal>

  <base-page-title :real-time-text="false" screener-name="Новая фича"/>

  <div class="q-mt-md">
    Предлагайте функционал, который вы хотели бы видеть и использовать на нашей платформе.<br>
    Мы внимательно рассматриваем каждое предложение, и принимаем решение о разработке.
  </div>

  <div class="q-mt-xl">
    <q-input
     label="Заголовок*"
     hint="В нескольких словах, как можно было бы назвать вашу фичу?"
     v-model="formData.title"
     maxlength="255"
     counter outlined
     :error="errorName"
     error-message="Это обязательное поле"
    />

    <q-input
      label="Описание*"
      hint="Если пожелаете то можете оставить ваши контактные данные в описании"
      v-model="formData.text"
      maxlength="2000"
      counter outlined
      class="q-mt-md"
      type="textarea"
      :error="errorText"
      error-message="Это обязательное поле"
    />

    <div>
      <q-btn
        label="Отправить"
        color="primary"
        text-color="dark"
        class="q-mt-md q-px-md q-py-sm f-w-800"
        :disable="disableBtn"
        @click="createFitch"
      />
    </div>
  </div>

</q-page>
</template>

<script>
import BasePageTitle from 'components/base-page-title'
import BasePageTopTitle from 'components/base-page-top-title'
import axios from 'axios'
import config from 'src/config'
import notifier from 'src/utils/notifier'

export default {
  name: 'page-new-fitch',
  components: { BasePageTopTitle, BasePageTitle },
  data () {
    return {
      formData: {
        title: '',
        text: ''
      },
      errorName: false,
      errorText: false,
      disableBtn: false
    }
  },
  methods: {
    async createFitch () {
      const vm = this
      if (!vm.formData.title) {
        vm.errorName = true
        return null
      }
      if (!vm.formData.text) {
        vm.errorText = true
        return null
      }

      try {
        await axios.post(`${config.pythonServerURI}/mainapp/create_fitch/`, {
          ...vm.formData
        }).then(res => {
          if (res.status === 201) {
            notifier('Спасибо! Ваше предлоежние принято.', 'primary')
            vm.disableBtn = true
            vm.formData.text = ''
            vm.formData.title = ''

            setTimeout(() => {
              vm.disableBtn = false
            }, 30000)
          }
        })
      } catch (e) {
        notifier(e.message)
      }
    }
  }
}
</script>

<style scoped>

</style>
