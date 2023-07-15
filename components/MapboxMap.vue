<script setup>
import { ref } from 'vue'
import {
  MapboxMap,
  MapboxMarker,
  MapboxNavigationControl,
} from '@studiometa/vue-mapbox-gl'
import { Icon } from '@iconify/vue'
import 'mapbox-gl/dist/mapbox-gl.css'
import useFilter from '~/utils/useFilter'
const runtimeConfig = useRuntimeConfig()

const mapBoxToken = runtimeConfig.public.mapBoxKey
const mapCenter = ref([0, 3.5])
const zoom = 1
const map = null

const { devices, positions, selectedId, filteredPositions } = defineProps([
  'positions',
  'devices',
  'selectedId',
  'filteredPositions',
])

onMounted(() => {
  console.log(filteredPositions)
})

console.log(map)
</script>

<template>
  <MapboxMap
    access-token="pk.eyJ1IjoidGltby1vbmUiLCJhIjoiY2xqbXdycGp4MHYxZTNscjd3MncxMGNmZSJ9.i8Kb9LRBKzTkWTlGNO0hiw"
    style="height: 100%; width: 100%"
    map-style="mapbox://styles/mapbox/streets-v11"
    :center="mapCenter"
    :zoom="zoom"
    @mb-created="(mapInstance) => (map = mapInstance)"
  >
    <MapboxNavigationControl position="bottom-right" />
    <MapboxMarker
      v-for="marker in filteredPositions"
      :key="marker.deviceId"
      :lng-lat="marker.position"
      popup
    >
      <template v-slot:popup>
        <div class="content">
          <p class="name">{{ marker.name }}</p>
          <span
            >Total Distance:
            <p>{{ marker.totalDistance }}</p></span
          >
        </div>
        <Icon
          icon="bxs:map"
          :class="
            marker.status === 'offline' ? 'offline-pointer' : 'online-pointer'
          "
        />
      </template>
    </MapboxMarker>
  </MapboxMap>
</template>
<style scoped>
.content {
  padding: 1rem;
  width: 300px;
  display: flex;
  flex-direction: column;
}
.content .name {
  text-align: left;
  color: #888;
  font-size: 0.95rem;
  padding-bottom: 1rem;
}

.content span {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.offline-pointer {
  color: red;
}

.online-pointer {
  color: initial;
}
</style>
