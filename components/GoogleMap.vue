<template>
  <GmapMap :center="center" :zoom="zoom" style="width: 100%; height: 600px" />

  <!-- </GmapMap> -->
</template>
<script>
export default {
  name: 'GoogleMap',
  data() {
    return {
      center: { lat: 0, lng: 0 },
      zoom: 3,
    }
  },
  mounted() {
    this.geolocate()
  },
  methods: {
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      })
    },
  },
}
</script>
