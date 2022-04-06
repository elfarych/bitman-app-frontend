<template>
<div class="page-card">
  <q-item clickable class="rounded-borders bg-dark column q-py-md" :to="{ name: item.routeName }">
    <q-item-label class="text-subtitle1 f-w-800 text-uppercase text-primary">{{ item.title }}</q-item-label>
    <q-item-section class="q-mt-xs">
      {{ item.text }}
    </q-item-section>
  </q-item>
</div>
</template>

<script>
export default {
  name: 'page-card',
  props: {

    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>

</style>
