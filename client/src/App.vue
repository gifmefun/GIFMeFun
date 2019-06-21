<template>
  <div id="app">
    <Navbar v-show="showPage=='main'"/>
    <Landing/>
    <MyGIFs/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Landing from './components/Landing.vue'
import MyGIFS from './components/MyGIFs.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Landing,
    MyGIFs
  },
  data() {
    return {
      showPage: 'main',
    }
  },
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
html { 
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./assets/GIF-Dance-Party.gif') no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
