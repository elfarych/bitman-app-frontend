<template>
<div class="auth-register-form">
  <q-form @submit="onsubmit">
    <div class="q-mt-md">
      <q-input
        dense
        v-model="user.email"
        label="E-mail*"
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
        v-model="user.password"
        type="password"
        label="Password*"
        :rules="rulesNoEmpty"
      >
        <template v-slot:prepend>
          <q-icon name="vpn_key"/>
        </template>
      </q-input>
    </div>

    <div class="">
      <q-input
        dense
        type="password"
        v-model="user.passwordConfirm"
        label="Confirm password*"
        lazy-rules
        :rules="rulesComparePasswordConfirm"
      >
        <template v-slot:prepend>
          <q-icon
            :name="user.password && user.password === user.passwordConfirm ? 'done_all' : 'vpn_key'"
            :color="user.password && user.password === user.passwordConfirm ? 'positive' : ''"
          />
        </template>
      </q-input>
    </div>

    <div class="text-left">
      <q-checkbox v-model="news" color="secondary" label="Send me project news"/>
    </div>

    <div style="height: 0; overflow: hidden">
      <q-checkbox v-model="botTest"/>
    </div>

    <div class="q-mt-md">
      <q-btn
        label="Register"
        class="full-width q-py-sm f-w-800"
        color="primary"
        icon-right="person_add"
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
import axios from 'axios'
import config from 'src/config'
import createJWT from 'components/trader/auth/get-jwt'
import notifier from 'src/utils/notifier'
import errorHandler from 'src/utils/error-handler'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'auth-register-form',
  computed: {
    rulesNoEmpty () {
      return [
        val => (!!val) || 'This is a required field'
      ]
    },
    rulesComparePasswordConfirm () {
      const vm = this
      return [
        val => (val === vm.user.password) || 'Passwords do not match'
      ]
    }
  },
  data () {
    return {
      botTest: false,
      loading: false,
      news: true,
      user: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
    }
  },
  methods: {
    ...mapMutations('trader', ['mutationUser']),
    ...mapActions('trader', ['createTrader']),
    async onsubmit () {
      const vm = this
      vm.loading = true

      if (vm.botTest) {
        return null
      }

      try {
        await axios
          .post(`${config.socialServerURI}/auth/users/`, {
            username: vm.user.email,
            email: vm.user.email,
            password: vm.user.password
          })
          .then(async res => {
            const user = res.data
            user.password = vm.user.password
            await createJWT(user)
            vm.mutationUser(user)
            await vm.createTrader()
            notifier('Success.', 'positive')
            await vm.$router.replace({
              name: 'Profile'
            })
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
