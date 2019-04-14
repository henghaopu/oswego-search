<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Nav/>
    <Cam/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Nav from '@/components/Nav.vue'
import Cam from '@/components/Cam.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
    Nav,
    Cam
  }
}
</script>
