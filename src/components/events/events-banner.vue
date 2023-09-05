<template>
<router-link :to="{ name: 'Events' }" class="events-banner banners relative-position block text-white">
    <q-img :src="image" class="fit rounded-borders-xl">
      <template v-slot:loading>
        <q-skeleton class="fit"/>
      </template>
    </q-img>
  <div class="absolute-bottom-left q-ma-sm" style="z-index: 10">
    <div class="text-h5 f-w-800 text-uppercase">{{ $t('events') }}</div>
    <div class="text-dark f-w-800">{{ $t('eventsText') }}</div>
  </div>
</router-link>
</template>

<script>
import eventsBanner from 'src/assets/events.jpeg'
export default {
  name: 'events-banner',
  computed: {
    image () {
      return eventsBanner
    }
  }
}
</script>

<style lang="sass">

</style>
