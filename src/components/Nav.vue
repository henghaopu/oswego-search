<template>
  <div>
    <nav>
      <router-link to="/">OSWEGO SEARCH</router-link>
      <ul>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
@import "@/styles/main.scss";
nav {
  height: 46px;
  background-color: #42b983;
}
nav > a {
  font-family: 'Shadows Into Light Two', sans-serif;
  float: left;
  padding: 15px;
}
nav > ul {
  float: right;
}
nav > ul > li {
  float: left;
}
nav > ul > li > a {
  font-family: 'Shadows Into Light Two', sans-serif;
  padding: 15px;
}

@media screen and (min-width: 768px) {
  nav {
    height: 56px;
  }
  nav > a, nav > ul > li > a {
    // padding: 20px;
    padding: 17px;
    font-size: 22px;
  }
}
</style>