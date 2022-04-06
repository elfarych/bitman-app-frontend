<template>
<div class="roadmap">
  <q-timeline color="primary" :layout="$mobile ? 'dense' : 'loose'">

    <q-timeline-entry
      v-for="item in roadmap"
      :key="item.id"
      :title="item.title"
      :subtitle="item.date_text"
      :side="item.in_work ? 'right' : 'left'"
      :color="item.in_work ? 'warning' : item.completed ? 'positive' : 'secondary'"
    >
      <div v-html="item.text" class="q-pb-sm">
      </div>
      <span v-if="item.in_work" class="bg-warning q-py-xs rounded-borders text-dark f-w-600 q-px-md">в работе</span>
      <span v-else-if="item.completed" class="bg-positive q-py-xs rounded-borders text-dark f-w-600 q-px-md">выполнено</span>
      <span v-else class="bg-secondary q-py-xs rounded-borders text-white f-w-600 q-px-md">планирование</span>

    </q-timeline-entry>

  </q-timeline>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'roadmap',
  computed: {
    ...mapState('siteInfo', ['roadmap'])
  },
  methods: {
    ...mapActions('siteInfo', ['loadRoadmap'])
  },
  created () {
    this.loadRoadmap()
  }
}
</script>

<style scoped>

</style>
