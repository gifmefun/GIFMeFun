<template>
  <div id="app">
    <Navbar
      v-show="showPage=='main'"
      @myGIFsPage="getGifs"
      @profilePage="showPage='profile'"
      @logout="logout"
    />
    <div
      v-if="showPage === 'main'"
      class="container-fluid"
      style="border : 1px red solid; background-color: whitesmoke"
    >
      <div class="row" style="height:540px">
        <div class="col-6" style="height: 100%; border : 1px blue solid">
          <h4 style="text-align: center">HAVING FUN !!!</h4>
          <div id="container">
            <video autoplay="true" id="videoElement"></video>
          </div>
          <br>
          <button v-on:click="openCamera">open camera</button>
          <button v-on:click="creategif">take GIF</button>
          <button v-on:click="snapshot">take SNAPSHOT</button>
        </div>
        <div class="col-6" style="height: 100%; border : 1px green solid;">
          <h4 style="text-align: center">RESULT</h4>
          <div id="container">
            <img id="result" alt="," style="height : 375px; width : 500px;">
          </div>
          <br>
          <button v-on:click="saveResult">save</button>
          <button
            @click="window.open(`https://www.facebook.com/sharer.php?u=https://daily.jstor.org/wp-content/uploads/2018/06/soccer_europe_1050x700.jpg`)"
            class="btn btn-primary"
          >
            <i class="fab fa-facebook-square align-middle" style="font-size:25px; "></i>
            <span class="align-middle">Share on Facebook</span>
          </button>
          <button v-on:click="throwResultCam">clear</button>
        </div>
      </div>
    </div>
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
import axios from './axios'
export default {
  name: "app",
  components: {
    Navbar,
    Landing,
    MyGIFs
  },
  data() {
    return {
      showPage: "landing",
      loggedUser: {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        image: localStorage.getItem("imageURL")
      },

      vStream: null,
      selectedPage: "",
      gifs: [],
      resultCam: "",

    };
  },
  created() {
    this.checkLogin();
    console.log(gifshot);
    
  },
  methods: {
    creategif() {
      gifshot.createGIF((obj) =>{
        if (!obj.error) {
          document.getElementById("result").src = "";
          var image = obj.image;
          // animatedImage = document.createElement('img');
          // animatedImage.src = image;
          // document.body.appendChild(animatedImage);
          document.getElementById("result").src = image;
          this.resultCam = image;
          console.log(this.resultCam);
        }
      });
    },
    openCamera() {
      var video = document.querySelector("#videoElement");

      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream)=> {
            this.vStream = stream;
            video.srcObject = stream;
          })
          .catch((err0r)=> {
            console.log("Something went wrong!");
          });
      }
    },
    closeCamera() {
      // var stream = video.srcObject;
      // var tracks = stream.getTracks();
      // for (var i = 0; i < tracks.length; i++) {
      //     var track = tracks[i];
      //     track.stop();
      // }
      // video.srcObject = null;
      // this.vStream.stop()
      // this.vStream = null
    },
    snapshot() {
      gifshot.takeSnapShot((obj)=> {
        if (!obj.error) {
          document.getElementById("result").src = "";
          var image = obj.image;
          console.log(obj);
          this.resultCam = image;
          console.log(this.resultCam);
          // animatedImage = document.createElement("img");
          document.getElementById("result").src = image;
          //   document.getElementById("result").appendChild(animatedImage)
          //   document.body.appendChild(animatedImage);
        }
      });
    },
    changePage(page) {
      this.selectedPage = page;
    },
    getGifs() {
      
      // ambil dari database
      // this.gifs = "..."; //update state gifs
      axios({
        method: "get",
        url: `/fav`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response);
          this.showPage='mygifs';
          // this.gifs = [...data]
        })
        .catch(({ response }) => {
          Swal.fire("Error", response.data.message, "error");
        });
    },
    updateUser() {},
    saveGIF() {},
    saveResult() {
      let formData = new FormData()
      formData.append('resultCam',this.resultCam)    
    
      axios({
        method: "post",
        url: `/fav`,
        data: {
          resultCam: formData
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          Swal.fire({
            type: "success",
            title: "Uploaded!",
            showConfirmButton: false,
            timer: 2000
          });
        })
        .catch(err => {
          Swal.fire("Error", err, "error");
        });
    },
    share() {},
    throwResultCam() {
      document.getElementById("result").src = "";
    },
    removeGIFs(id) {},
    checkLogin(data) {
      console.log(data);
      
      if (data) {
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("imageURL", data.user.imageURL);
        localStorage.setItem("token", data.token);
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
/* Dropdown Button */
.dropbtn {
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

#container {
  margin: 0px auto;
  width: 500px;
  height: 375px;
  border: 10px #333 solid;
}
#videoElement {
  width: 500px;
  height: 375px;
  background-color: #666;
}
</style>
