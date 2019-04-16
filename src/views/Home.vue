<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Cam/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import Cam from '@/components/Cam.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
    Cam
  }
}
</script>
