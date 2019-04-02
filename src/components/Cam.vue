<template>
  <div>
    <h2>OSWEGO SEARCH</h2>
    <!-- <button @click="callFirebaseFunctions">call firebase functions</button> -->

    <div class="video-container">
      <video autoplay playsinline></video>
    </div>

    <div class="btn-container">
      <button @click="openCamera">OPEN</button>
      <!-- <button @click="pauseVideo">PAUSE</button>
      <button @click="resumeVideo">RESUME</button> -->
      <button @click="closeCamera">CLOSE</button>
      <button @click="takeAPhoto">SNAPSHOT</button>
    </div>
    <div class="canvas-container">
      <canvas id="canvas-shapshot"></canvas>
    </div>

  </div>
</template>

<script>
import functions from '@/firebase/init'
import axios from 'axios'

export default {
  name: 'Cam',
  data() {
    return {
      // reference to dom element
      video: null,
      canvasSnapshot: null,
      // reference to WebRTC stream
      stream: null,

      // base64Image: null,
      imageLabels: null
    }
  },
  mounted () {
    // get dom element
    this.video = document.querySelector('video')
    this.canvasSnapshot = document.querySelector('#canvas-shapshot')
  },
  methods: {
    // callFirebaseFunctions () {
    //   console.log('in callFirebaseFunctions')
    //   let printMessage = functions.httpsCallable('printMessage')
    //   printMessage({text: 'test data'}).then( result => {
    //     console.log(result.data)
    //   })
    // },
    async openCamera () {
      if (hasGetUserMedia()) {
        // The constraints parameter is a MediaStreamConstraints object with two members: video and audio
        const constraints = {
            video: true
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        this.stream = stream
        this.video.srcObject = stream
      } else {
        alert('getUserMedia() is not supported by your browser')
      }

      function hasGetUserMedia() {
        return (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
      }

    },
    // pauseVideo () {
    //   // pause the stream
    //   this.video.pause()
    // },
    // resumeVideo () {
    //   this.video.play()
    // },
    closeCamera () {
      // stop both video and audio
      this.stream.getTracks().forEach(track => {
        track.stop()
      })
    },
    takeAPhoto () {
      this.canvasSnapshot.width = this.video.videoWidth
      this.canvasSnapshot.height = this.video.videoHeight
      this.canvasSnapshot.getContext('2d').drawImage(this.video, 0, 0)
      // this.base64Image = this.canvasSnapshot.toDataURL()
      // console.log(this.base64Image)
      // eslint-disable-next-line
      console.log('in takeAPhoto()')
      let base64Image = this.canvasSnapshot.toDataURL().split(',')[1]
      // this.compareImages(base64Image)
      // let sessionUrl = 'https://automl.googleapis.com/v1beta1/projects/oswego-search/locations/us-central1/models/ICN4949278095472438711:predict'
      
      // (GET) This works!
      // axios.get('https://us-central1-oswego-search.cloudfunctions.net/helloWorld')
      // .then( response => {
      //   console.log(response)
      // })
      
      // (POST) This also works!
      // axios.post('https://us-central1-oswego-search.cloudfunctions.net/helloWorld', {
      //   "payload": {
      //     "image": {
      //       "imageBytes": base64Image
      //     }
      //   }
      // }).then(response => {
      //   console.log(response)
      // })

      // test
      axios.post('https://us-central1-oswego-search.cloudfunctions.net/getImageLabels', {
        "payload": {
          "image": {
            "imageBytes": base64Image
          }
        }
      }).then(response => {
        // eslint-disable-next-line
        console.log(response)
      }).catch(error => {
        // eslint-disable-next-line
        console.log(error)
      })


      // let printMessage = functions.httpsCallable('printMessage')
      // printMessage({text: 'test data'}).then( result => {
      //   console.log(result.data)
      // })

    },
    compareImages (base64Image) {
      let getImageLabels = functions.httpsCallable('getImageLabels')
      // async
      getImageLabels({ base64Image: base64Image }).then( result => {
        // result is whatever compareImages function return to us, which is the labels we want
        // eslint-disable-next-line
        console.log(result.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Shadows Into Light Two', cursive;
}
h2 {  
  font-family: 'Rock Salt', cursive;
}
.container {
  text-align: center;
}
video {
  background: lightgray;
  border: 2px black solid;
  max-width: 100%;
  max-height: 50%;
}
canvas {
  border: 2px black solid;
  max-width: 100%;
}
.video-container, .canvas-container {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
button {
  margin: 0.5rem;
}
button:hover {
  cursor: pointer;
  background-color: #42b983;
  color: white;
}

</style>
