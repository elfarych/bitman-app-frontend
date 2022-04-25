<template>
<div class="widget-long-short-positions-diagram">
  <div class="row" :style="`height: ${diagramHeight || 170}px`">

    <div class="col-6 relative-position">
      <div class="bg-positive widget-long-short-positions-diagram-column transition-05 green-shadow" :style="`height: ${longs}%`">
        <div class="text-center f-w-600 absolute-top" style="top: -15px; font-size: 12px">{{ longs || '' }}%</div>
      </div>
    </div>

    <div class="col-6 relative-position">
      <div class="bg-negative widget-long-short-positions-diagram-column transition-05 red-shadow" :style="`height: ${shorts}%`">
        <div class="text-center f-w-600 absolute-top" style="top: -15px; font-size: 12px">{{ shorts || '' }}%</div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'widget-long-short-positions-diagram',
  props: {
    token: {
      type: Object,
      default: () => {}
    },
    diagramHeight: Number
  },
  computed: {
    longs () {
      return parseFloat(this.token.longs)
    },
    shorts () {
      return parseFloat(this.token.shorts)
    }
  }
}
</script>

<style lang="sass">
.widget-long-short-positions-diagram-column
  position: absolute
  bottom: 0
  left: 50%
  margin-left: -25px
  width: 50px
  border-top-left-radius: 4px
  border-top-right-radius: 4px
</style>
