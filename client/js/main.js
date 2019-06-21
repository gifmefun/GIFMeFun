
new Vue({
    el : '#app',
    data : {
        isLogin : true,
        isRegister : false,
        loggedUser : {
            name : localStorage.getItem('username'),
            email : localStorage.getItem('email')
        },
        navMenu : [
            {
                text : 'New Articles',
                icon : 'fas fa-edit'
            }
        ],
        vStream : null,
        selectedPage : '',
        gifs : []
    },
    methods : {
        creategif : function (){
            gifshot.createGIF(function(obj) {
                if(!obj.error) {
                    var image = obj.image,
                    animatedImage = document.createElement('img');
                    animatedImage.src = image;
                    document.body.appendChild(animatedImage);
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
        changePage(page){
            this.selectedPage = page
        },
        getGifs(){
            // ambil dari database
            this.gifs = '...' //update state gifs
        }
    }
})

