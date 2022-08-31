<template>
<div class="events">
  <div class="row q-col-gutter-md">
    <div
      v-for="event in events"
      :key="event.id"
      class="col-12 col-sm-6 col-md-4"
    >
      <event-card :event="event"/>
    </div>
  </div>
</div>
</template>

<script>
import EventCard from 'components/events/event-card'

export default {
  name: 'events',
  components: { EventCard },
  props: {
    events: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
