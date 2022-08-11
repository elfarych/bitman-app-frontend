<template>
<div class="partners-online-trader-copy-result-card bg-dark rounded-borders q-pa-sm">
  <div class="relative-position">
    <div
      class="bg-dark"
      :class="fullscreen ? 'partners-online-trader-copy-result-card-fullscreen' : ''"
    >
      <q-btn
        v-if="fullscreen"
        class="absolute-top-right q-ma-sm f-w-800"
        label="Close"
        outline
        icon-right="close"
        @click="fullscreen = false"
      />
      <q-img
        :src="result.image"
        :height="!fullscreen ? '300px' : '100%'"
        class="rounded-borders"
        :contain="fullscreen"
      >
        <template v-slot:loading>
          <q-skeleton class="fit"/>
        </template>
      </q-img>
    </div>

    <q-btn
      icon="fullscreen"
      class="q-ma-sm absolute-bottom-right"
      color="dark"
      dense
      @click="fullscreen = true"
    />
  </div>

  <small>{{ $dayjs(result.date).format('DD.MM.YYYY hh:mm') }}</small>
  <div class="text-subtitle1 f-w-800 q-my-xs">{{ result.title }}</div>
  <div class="">{{ result.content }}</div>
  <div class="">
    <q-btn
      :label="result.link_text"
      no-caps
      class="q-mt-md f-w-600"
      color="secondary"
      target="_blank"
      type="a"
      :href="result.link"
    />
  </div>

</div>
</template>

<script>
export default {
  name: 'partners-online-trader-copy-result-card',
  props: {
    result: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      fullscreen: false
    }
  }
}
</script>

<style lang="sass">
.partners-online-trader-copy-result-card-fullscreen
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 3000
  padding: 50px 10px
</style>
