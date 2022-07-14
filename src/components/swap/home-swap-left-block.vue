<template>
<div class="home-swap-left-block ">
  <div>
    <h2 class="home-swap-left-block-title">Bitman <span class="text-primary">trade</span></h2>
    <h3 class="home-swap-left-block-title-2 q-mt-md">{{ $t('homeTitle') }}</h3>

    <div class="q-my-md">
      <cryptobox-btn />
    </div>
  </div>
</div>
</template>

<script>
import CryptoboxBtn from 'components/wallet/cryptobox/cryptobox-btn'
export default {
  name: 'home-swap-left-block',
  components: { CryptoboxBtn }
}
</script>

<style lang="sass">
.home-swap-left-block-title
  font-size: 30px
  font-weight: 900
  text-transform: uppercase

.home-swap-left-block-title-2
  font-size: 20px
  font-weight: 900
  text-transform: uppercase
  max-width: 400px
</style>
