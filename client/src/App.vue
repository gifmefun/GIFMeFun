<template>
  <div id="app">
    <Navbar
      v-show="showPage=='main'"
      @myGIFsPage="showPage='mygifs'"
      @profilePage="showPage='profile'"
      @logout="logout"
    />
    <div v-if="showPage === 'main'" class="container-fluid" style="border : 1px red solid; background-color: whitesmoke">
            <div class="row" style="height:540px">
                <div class="col-6" style="height: 100%; border : 1px blue solid">
                    <h4 style="text-align: center">HAVING FUN !!!</h4>
                    <div id="container">
                        <video autoplay="true" id="videoElement">
                        
                        </video>
                    </div>
                    <br>
                    <button v-on:click="openCamera">open camera</button>
                    <button v-on:click="creategif()">take GIF</button>
                    <button v-on:click="snapshot">take SNAPSHOT</button>
                </div>
                <div  class="col-6" style="height: 100%; border : 1px green solid;">
                        <h4 style="text-align: center">RESULT</h4>
                        <div id="container">
                            <img id="result" alt="," style="height : 375px; width : 500px;">
                            
                        </div>
                        <br>
                        <button v-on:click="saveResult">save</button>
                        <button v-on:click="share">share fb</button>
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
      loggedUser : {
            name : localStorage.getItem('name'),
            email : localStorage.getItem('email'),
            image : localStorage.getItem('imageURL')
        },
        
        vStream : null,
        selectedPage : '',
        gifs : [],
        resultCam : ''
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    creategif : function (){
            gifshot.createGIF(function(obj) {
                if(!obj.error) {
                    document.getElementById("result").src = ''
                    var image = obj.image
                    // animatedImage = document.createElement('img');
                    // animatedImage.src = image;
                    // document.body.appendChild(animatedImage);
                    document.getElementById("result").src = image;
                    this.resultCam = image
                    console.log(this.resultCam)
                }
            });
        },
        openCamera : function() {
            var video = document.querySelector("#videoElement");

            if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    this.vStream = stream
                    video.srcObject = stream;
                })
                .catch(function (err0r) {
                console.log("Something went wrong!");
                });
            }
        },
        closeCamera : function() {
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
        snapshot(){
            gifshot.takeSnapShot(function(obj) {
                if(!obj.error) {
                  document.getElementById("result").src = ''
                  var image = obj.image
                  console.log(obj)
                  this.resultCam = image
                  console.log(this.resultCam)
                  animatedImage = document.createElement('img');
                  document.getElementById("result").src = image;
                //   document.getElementById("result").appendChild(animatedImage)
                //   document.body.appendChild(animatedImage);
                }
              });
        },
        changePage(page){
            this.selectedPage = page
        },
        getGifs(){
            // ambil dari database
            this.gifs = '...' //update state gifs
        },
        updateUser(){

        },
        saveGIF(){

        },
        saveResult(){

        },
        share(){

        },
        throwResultCam(){
            document.getElementById("result").src = '';
        },
        removeGIFs(id){

        },
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
 /* Dropdown Button */
 .dropbtn {
    background-color: #4CAF50;
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
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
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
  .dropdown-content a:hover {background-color: #ddd;}
  
  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {display: block;}
  
  /* Change the background color of the dropdown button when the dropdown content is shown */
  .dropdown:hover .dropbtn {background-color: #3e8e41;} 


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
