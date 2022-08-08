<template>
  <div class="auth-login-form">
    <q-form @submit="onsubmit">
      <div class="q-mt-md">
        <q-input
          dense
          v-model="user.email"
          label="E-mail"
          :rules="rulesNoEmpty"
        >
          <template v-slot:prepend>
            <q-icon name="mail"/>
          </template>
        </q-input>
      </div>

      <div class="">
        <q-input
          dense
          type="password"
          v-model="user.password"
          label="Password"
          :rules="rulesNoEmpty"
        >
          <template v-slot:prepend>
            <q-icon name="vpn_key"/>
          </template>
        </q-input>
      </div>

      <div style="height: 0; overflow: hidden">
        <q-checkbox v-model="botTest"/>
      </div>

      <div class="q-mt-md">
        <q-btn
          label="Login"
          class="full-width q-py-sm f-w-800"
          color="primary"
          icon-right="login"
          text-color="dark"
          unelevated
          no-caps
          :loading="loading"
          type="submit"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import config from 'src/config'
import errorHandler from 'src/utils/error-handler'
import axios from 'axios'
import notifier from 'src/utils/notifier'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'auth-login-form',
  computed: {
    rulesNoEmpty () {
      return [
        val => (!!val) || 'This is a required field'
      ]
    }
  },
  data () {
    return {
      botTest: false,
      loading: false,
      user: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations('trader', ['mutationUser']),
    ...mapActions('trader', ['loadUser', 'getTrader']),
    async onsubmit () {
      const vm = this

      vm.loading = true

      if (vm.botTest) {
        return null
      }

      try {
        await axios
          .post(`${config.socialServerURI}/auth/jwt/create/`, {
            username: vm.user.email,
            email: vm.user.email,
            password: vm.user.password
          })
          .then(async res => {
            const jwt = res.data.access
            if (jwt) {
              localStorage.setItem('jwt', jwt)
              await vm.loadUser()
              await vm.getTrader()
              notifier('Success.', 'positive')
              await vm.$router.replace({
                name: 'Profile'
              })
            }
          })
          .catch(res => {
            const data = res.response.data
            if (data) {
              for (const key in data) {
                const message = typeof data[key] !== 'string' ? data[key].join('. ') : data[key]
                notifier(message, 'negative')
              }
            } else {
              notifier(res.message, 'negative')
            }
          })
      } catch (e) {
        errorHandler(e)
      } finally {
        vm.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
