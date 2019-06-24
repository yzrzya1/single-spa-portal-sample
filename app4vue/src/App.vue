<template>
  <div id="app4" class="app-container">
    <img src="./assets/logo.png" width="100" height="100">
    <HelloWorld msg="This was rendered by App4 which is written in Vue.js"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app4',
  components: {
    HelloWorld
  },
}
</script>

<style>
#app4 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
