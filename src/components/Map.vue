<template>
  <div>
      <div class="map-container">
        <div class="google-map"></div>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'map',
  props: ['location'],
  data () {
    return {
      
    }
  },
  mounted () {
    this.renderMap()
  },
  methods: {
    renderMap () {
      const map = new google.maps.Map(document.querySelector('.google-map'), {
        center: {lat: this.location._lat, lng: this.location._long},
        zoom: 15,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: false
      })
      var myLatlng = new google.maps.LatLng(this.location._lat, this.location._long);
      var marker = new google.maps.Marker({
        position: myLatlng
      })
      // To add the marker to the map, call setMap();
      marker.setMap(map)
    }
  }
}
</script>

<style lang="scss">
.google-map {
  /* width: 100vw; */
  /* height: 100vh; */

  width: 80vw;
  height: 50vh;
  margin: 5vh auto;
  border: 1px solid gray;
}
</style>
