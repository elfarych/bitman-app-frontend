<template>
  <q-item
    class="coin-card bg-dark rounded-borders"
    clickable
  >
    <div>
      <!--  Coin avatar-->
      <div>
        <q-avatar size="30px" class="bg-transparent" square>
          <q-img
            v-if="coin.image"
            :src="coin.image.small || coin.image.thumb"
            contain
            class="rounded-borders"
            img-class="white-shadow"
          >
            <template v-slot:loading>
              <q-skeleton class="fit"/>
            </template>
          </q-img>
        </q-avatar>
      </div>
    </div>
  </q-item>
</template>

<script>
import errorHandler from 'src/utils/error-handler'
import config from 'src/config'

export default {
  name: 'coin-card',
  props: {
    coinId: String
  },
  data () {
    return {
      coin: null
    }
  },
  methods: {
    async loadCoinData () {
      const vm = this
      try {
        await vm.$axios(`${config.coinGeckoAPI}/coins/${vm.coinId}`)
          .then(res => {
            vm.coin = res.data
          })
      } catch (e) {
        errorHandler(e)
      }
    }
  },
  created () {
    this.loadCoinData()
  }
}
</script>

<style scoped>

</style>
