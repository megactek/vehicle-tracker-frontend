<script setup>
import { ref } from 'vue'
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
const runtimeConfig = useRuntimeConfig()

const mapBoxToken = runtimeConfig.public.mapBoxKey
const mapCenter = ref([0, 3.5])
const zoom = 1
const map = null
</script>

<template>
  <MapboxMap
    access-token="pk.eyJ1IjoidGltby1vbmUiLCJhIjoiY2xqbXdycGp4MHYxZTNscjd3MncxMGNmZSJ9.i8Kb9LRBKzTkWTlGNO0hiw"
    style="height: 100%; width: 100%"
    map-style="mapbox://styles/mapbox/streets-v11"
    :center="mapCenter"
    :zoom="zoom"
    @mb-created="(mapInstance) => (map = mapInstance)"
  />
  />
  <!-- </MapboxMap> -->
</template>
