<template>
  <div
    class="post-card cursor-pointer"
    :style="`background: url(${post.miniature})`"
    @click="goToPostDetail"
  >
    <div class="post-card-meta">
      <small class="bg-info absolute-top-right q-pa-sm rounded-borders q-ma-sm">{{ post.category.name }}</small>
      <div class="absolute-bottom q-pa-md">
        <h3 class="text-h6 f-w-800"> {{ post.title }} </h3>
        <div>{{ post.text }}</div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'post-card',
  props: {
    post: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    goToPostDetail () {
      this.$router.push({
        name: 'Post-detail',
        params: {
          slug: this.post.slug
        }
      })
    }
  }
}
</script>

<style lang="sass">
.post-card
  height: 400px
  padding: 10px
  border-radius: 4px
  position: relative

.post-card-meta
  background-image: linear-gradient(-180deg,transparent 20%,#131722)
  background-position: center center
  background-repeat: no-repeat
  background-size: cover
  position: absolute
  border-radius: 4px
  top: 0
  left: 0
  right: 0
  bottom: 0
  transition: .5s all

  &:hover
    background-image: linear-gradient(-180deg,transparent 20%,$info)

@media screen and (max-width: 1399px)
  .post-card
    height: 360px

@media screen and (max-width: 1100px)
  .post-card
    height: 250px
</style>
