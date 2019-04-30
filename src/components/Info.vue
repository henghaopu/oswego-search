<template>
  <div class="info">
    <!-- <h2>{{ searchInfo.name }}</h2>   -->
    <!-- <p>{{searchInfo}}</p> -->
    <div class="grid">
      
      <figure class="img-container">
        <img v-if="imageUrl" :src="imageUrl" :alt="searchInfo.name" width="200px">
        <figcaption>{{ searchInfo.name }}</figcaption>
      </figure>

      <div v-if="searchInfo" class="description-container">
        <p>{{ searchInfo.description }}</p>
      </div>

    </div>

    <Map :location="searchInfo.location"/>
    
  </div>
</template>

<script>
import firebaseApp from '@/firebase/init'
import Map from '@/components/Map.vue'

export default {
  name: 'info',
  props: ['keyword'],
  components: {
    Map
  },
  data () {
    return {
      // searchInfoCollection: [],
      searchInfo: null,
      imageUrl: null
    }
  },
  created () {
    // fetch data from the firestore
    let db = firebaseApp.firestore()
    let storage = firebaseApp.storage()
    let oswegoSearchCollectionRef = db.collection('oswego-search-collection')
    // get() method: return a promise & take some time to get all the docs from the collection, 
    // then fire the function inside the .then() method 
    oswegoSearchCollectionRef.get()
    .then(snapshot => {
      // the snapshot may contain many docs, we can cycle through it to get each doc
      snapshot.forEach(doc => {
        // doc contains info about the document along with properties and methods that firebase provides us 
        // use doc.data() to target the real data the doc holds
        let searchInfo = doc.data()
        searchInfo.id = doc.id
        // this.searchInfoCollection.push(searchInfo)
        searchInfo.keywords.forEach(keyword => {
          if (keyword === this.keyword) {
            this.searchInfo = searchInfo
          }
        })
      })
    })
    .then(() => {
      // Create a storage reference from the storage service
      let folderRef = storage.ref(this.searchInfo.imagePath.folderName)
      let imageRef = folderRef.child(this.searchInfo.imagePath.imageName + '.' + this.searchInfo.imagePath.extension)
      imageRef.getDownloadURL()
      .then(url => {
        this.imageUrl = url
      }).catch(err => {
        // eslint-disable-next-line
        console.log(err)
      })
    })

  }
}
</script>

<style lang="scss">
.grid {
  background-color: #fffaf6;
  // background-color: #fff4ea;
  width: 80vw;
  margin: 0 auto;
}
.description-container {
  height: 40vh;
  overflow-y: scroll;
}

.description-container > p {
  text-align: left;
  padding: 1rem;
}
.info > .grid > .img-container, 
.info > .grid > .description-container {
  text-align: center;
  padding-top: 15px;
}

.img-container > img {
  margin: 1rem 1rem 0 1rem;
}
.img-container > figcaption, .description-container > p {
  font-family: 'Raleway', sans-serif;
  padding: 1rem;
}
.description-container > p {
  line-height: 1.6rem;
}

@media screen and (min-width: 768px) {
  .grid {
    // border: 1px solid gray;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
  .img-container {
    grid-column: 1 / 2;
    align-self: center;
  }
  .description-container {
    grid-column: 2 / 3;
    // height: 300px;
    height: 40vh;
    overflow-y: scroll;
  }
  .img-container > figcaption {
    font-size: 20px;
  }
  .description-container > p {
    font-size: 18px;
    line-height: 1.8rem;
  }
}

</style>
