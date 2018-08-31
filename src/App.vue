<template>
  <div id="app">
    <router-view/>
  </div>
</template>
@import '../src/styles/global.css';
<script>
export default {
  data () {
    return {}
  },
  name: 'App'
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
</style>
