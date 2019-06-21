
new Vue({
    el : '#app',
    data : {
        isLogin : true,
        isRegister : false,
        loggedUser : {
            name : localStorage.getItem('username'),
            email : localStorage.getItem('email'),
            image : localStorage.getItem('image')
        },
        
        vStream : null,
        selectedPage : '',
        gifs : [],
        resultCam : ''
    },
    methods : {
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

        }
    }
})

