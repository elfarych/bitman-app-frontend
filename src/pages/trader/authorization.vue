<template>
<q-page class="q-pa-sm">
  <base-page-title :real-time-text="false" screener-name="Account"/>
  <portal to="title">
    <base-page-top-title title="Account"/>
  </portal>
  <div class="text-center q-mt-xl q-pt-lg">
    <q-card class="bg-transparent shadow-0 q-mt-xl" style="width: 100%; max-width: 500px; margin: auto">
      <q-card-section>
        <div class="flex items-center full-height justify-center">
          <q-btn
            label="Sign"
            no-caps unelevated flat
            :color="view === 'login' ? 'primary' : ''"
            class="f-w-800 transition-1"
            @click="view = 'login'"
          />

          <q-btn
            label="Sign up"
            :color="view === 'register' ? 'primary' : ''"
            class="f-w-800 q-ml-sm transition-1"
            no-caps unelevated flat
            @click="view = 'register'"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <auth-login-form v-if="view === 'login'"/>
        <auth-register-form v-else/>
      </q-card-section>
    </q-card>
  </div>
</q-page>
</template>

<script>
import BasePageTitle from 'components/base-page-title'
import AuthLoginForm from 'components/trader/auth/auth-login-form'
import AuthRegisterForm from 'components/trader/auth/auth-register-form'
import BasePageTopTitle from 'components/base-page-top-title'
export default {
  name: 'authorization',
  components: { BasePageTopTitle, AuthRegisterForm, AuthLoginForm, BasePageTitle },
  data () {
    return {
      view: 'login'
    }
  }
}
</script>

<style scoped>

</style>
