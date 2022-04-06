<template>
  <div class="fullscreen bg-dark text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="f-w-800" style="font-size: 20vh">
        404
      </div>

      <div class="text-h5" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl q-pa-sm rounded-borders f-w-600"
        color="secondary"
        text-color="white"
        icon="home"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
