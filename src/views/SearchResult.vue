<template>
  <div>
    <!-- (2) grab the slug from the url and display on the page. This can be used to query our database -->
    <h2>Search Result</h2>
    <Info :keyword="keyword"/>
  </div>
</template>

<script>
import Info from '@/components/Info.vue'
// import Map from '@/components/Map.vue'

export default {
  name: 'search-result',
  components: {
    Info,
    // Map
  },
  data () {
    return {
      keyword: this.$route.params.keyword
    }
  }
}
</script>

<style lang="scss">

</style>
