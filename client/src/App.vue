<template>
  <div id="app">
    <Navbar
      v-show="showPage=='main'"
      @myGIFsPage="showPage='mygifs'"
      @profilePage="showPage='profile'"
      @logout="logout"
    />
    <Landing v-show="showPage=='landing'" @loginSuccess="checkLogin"/>
    <div v-show="showPage=='mygifs'" class="container">
      <div class="card-deck">
        <MyGIFs v-for="gif in gifs" :key="gif"/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Landing from "./components/Landing.vue";
import MyGIFs from "./components/MyGIFs.vue";

export default {
  name: "app",
  components: {
    Navbar,
    Landing,
    MyGIFs
  },
  data() {
    return {
      showPage: "landing"
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin(user) {
      if(user){
        localStorage.setItem('name',user.name)
        localStorage.setItem('email',user.email)
        localStorage.setItem('imageURL',user.imageURL)
        localStorage.setItem('token',user.token)
      }
      if (localStorage.getItem("token")) {
        this.showPage = "main";
      } else {
        this.showPage = "landing";
      }
    },
    logout() {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("imageURL");
      localStorage.removeItem("token");
      this.showPage = "landing";
    }
  }
};
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
  /* linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),  */
  background: url("./assets/GIF-Dance-Party.gif") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
