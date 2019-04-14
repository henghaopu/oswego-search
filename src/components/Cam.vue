<template>
  <div>
    <!-- <h2>OSWEGO SEARCH</h2> -->
    <!-- <button @click="callFirebaseFunctions">call firebase functions</button> -->
    <!-- Switch -->
    <div class="switch">
      <label for="camera-switch" >
        <!-- OFF -->
        <input type="checkbox" id="camera-switch" v-model="cameraSwitch" @click="triggerToggle">
        <span class="lever" tabindex="3" @keydown.enter="triggerToggle"></span>
        <!-- ON -->
        {{cameraSwitch?'CAMERA ON':'CAMERA OFF'}}
      </label>
    </div>
    <!-- video-container might be used in Materialize -->
    <div class="cam-video-container">
      <video autoplay playsinline></video>
    </div>

    <div class="canvas-btn-container">
      <canvas id="canvas-shapshot" tabindex="5"></canvas>
      <!-- <button @click="openCamera">OPEN</button> -->
      <!-- <button @click="pauseVideo">PAUSE</button>
      <button @click="resumeVideo">RESUME</button> -->
      <!-- <button @click="closeCamera">CLOSE</button> -->
      <button @click="takeAPhoto" tabindex="4"><i class="material-icons">photo_camera</i></button>
    </div>
    <!-- <div class="canvas-container">
      <canvas id="canvas-shapshot"></canvas>
    </div> -->
      
  </div>
</template>

<script>
import functions from '@/firebase/init'
import axios from 'axios'

export default {
  name: 'Cam',
  data() {
    return {
      cameraSwitch: false,
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
    triggerToggle () {
      if (this.cameraSwitch) {
        this.closeCamera()
      } else {
        this.openCamera()
      }
    },
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

<style lang="scss">
/* <style scoped> will impact the usage of Material Icons */

@import "@/styles/main.scss";

h2, button, label {
  font-family: 'Shadows Into Light Two', sans-serif;
}
h2 {  
  font-size: $font-size-h2;
  line-height: $line-height-h2;
  text-align: center;
}
.switch {
  text-align: center;
  margin: $margin-regular;  
}
.cam-video-container video {
  // <video> elements are inline elements, not block elements. -> margin: 0 auto; won't work in in-line
  display: block;
  background: lightgray;
  border: 1px black solid;
  width: 80vw;
  // *** npm run build won't complete if calc is used ***
  // height: calc(width);
  max-width: 768px;
  max-height: 768px;
  margin: 0 auto;
}
canvas {
  border: 1px black solid;
  max-width: 100%;
}
.video-container, .canvas-container {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.canvas-btn-container {
  position: relative;
  width: 80vw;
  max-width: 768px;
  margin: 16px auto;
  height: 100px;
  text-align: center;
}
#canvas-shapshot {
  position: absolute;
  left: 0px;
  width: 77px;    // 1.33    1
  height: 58px;   // 1      0.75
}
button {
  border-radius: 28px;
  width: 56px;
  height: 56px;
  background-color: #42b983;
  color: white;
}
.canvas-btn-container > button > i {
  margin-top: 10%;
}
button:hover, button:focus {
  cursor: pointer;
  background-color: #5ece9b;
  color: black;
}
#camera-switch:focus {
  border: 2px solid red;
}

@media screen and (min-width: 768px) {
  button {
    width: 94px;
    height: 94px;
    border-radius: 47px;
  }
  .canvas-btn-container > button > i {
    font-size: 36px;
  }
  #canvas-shapshot {
    top: 14.75px;
    width: 94px;
    height: 70.5px;
  }
}

</style>
