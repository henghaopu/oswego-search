<template>
  <div class="about">
    <h2>About Page</h2>
    <p>Pending...</p>
  </div>
</template>

<script>
export default {
  name: 'about'
}
</script>

<style lang="scss">
.about > h2 {
  font-family: 'Shadows Into Light Two', sans-serif;
  font-size: 22px;
  padding: 1rem;
}
.about > p {
  font-family: 'Shadows Into Light Two', sans-serif;
  font-size: 18px;
  padding: 1rem;
}
@media screen and (min-width: 768px) {
  .about > h2 {
    font-size: 32px;
    padding: 1.8rem;
  }
  .about > p {
    font-size: 28px;
    padding: 1.4rem;
  }
}
</style>