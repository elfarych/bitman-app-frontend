<template>
  <q-page class="q-pa-sm relative-position">
    <portal to="title">
      <base-page-top-title :title="$t('events')" class="text-capitalize"/>
    </portal>

    <base-page-title :real-time-text="false" :screener-name="$t('events')"/>

    <section class="q-mt-lg">
      <q-btn
        label="Upcoming"
        class="text-subtitle1 f-w-800 rounded-borders-xl"
        color="primary"
        :flat="eventsMode === 'ended'"
        no-caps
        @click="eventsMode = 'upcoming'"
      />
      <q-btn
        label="Ended"
        class="text-subtitle1 f-w-800 rounded-borders-xl q-ml-sm"
        color="primary"
        :flat="eventsMode === 'upcoming'"
        no-caps
        @click="eventsMode = 'ended'"
      />

      <events class="q-mt-md" :events="events"/>
    </section>
  </q-page>
</template>

<script>
import BasePageTopTitle from 'components/base-page-top-title'
import BasePageTitle from 'components/base-page-title'
import { mapActions, mapState } from 'vuex'
import Events from 'components/events/events'
export default {
  name: 'page-events',
  components: { Events, BasePageTitle, BasePageTopTitle },
  computed: {
    ...mapState('events', ['upcomingEvents', 'endedEvents']),
    events () {
      return this.eventsMode === 'upcoming' ? this.upcomingEvents : this.endedEvents
    }
  },
  methods: {
    ...mapActions('events', ['init'])
  },
  data () {
    return {
      eventsMode: 'upcoming'
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>

</style>
