<template>
  <div class="info">
    <h2>Custom Info</h2>  
    <!-- <p>{{searchInfo}}</p> -->
    <div class="img-container">
      <img v-if="imageUrl" :src="imageUrl" :alt="searchInfo.name" width="200px">
    </div>
    <div v-if="searchInfo" class="description-container">
      <p>{{ searchInfo.description }}</p>
    </div>
  </div>
</template>

<script>
import firebaseApp from '@/firebase/init'
export default {
  name: 'info',
  props: ['keyword'],
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
.info > .img-container, 
.info > .description-container {
  text-align: center;
  padding-top: 15px;
}
</style>
