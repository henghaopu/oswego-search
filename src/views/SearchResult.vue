<template>
  <div class="search-result">
    <!-- (2) grab the slug from the url and display on the page. This can be used to query our database -->
    <h2>Search Result</h2>
    <Info :keyword="keyword"/>
  </div>
</template>

<script>
import Info from '@/components/Info.vue'

export default {
  name: 'search-result',
  components: {
    Info
  },
  data () {
    return {
      keyword: this.$route.params.keyword
    }
  }
}
</script>

<style lang="scss">
.search-result > h2 {
  font-family: 'Shadows Into Light Two', sans-serif;
  font-size: 22px;
  padding: 1rem;
}

@media screen and (min-width: 768px) {
  .search-result > h2 {
    font-size: 32px;
    padding: 1.8rem;
  }
}
</style>
