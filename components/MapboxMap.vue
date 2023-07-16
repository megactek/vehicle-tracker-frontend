<script setup>
import { ref } from 'vue'
import {
  MapboxMap,
  MapboxMarker,
  MapboxNavigationControl,
} from '@studiometa/vue-mapbox-gl'
import { Icon } from '@iconify/vue'
import 'mapbox-gl/dist/mapbox-gl.css'
import { sessionStore } from '~/store/sessions'
import { deviceStore } from '~/store/device'
const runtimeConfig = useRuntimeConfig()

const mapBoxToken = runtimeConfig.public.mapBoxKey
const mapCenter = ref([0, 3.5])
const zoom = 1
const map = ref(null)
// const { devices, positions, selectedId, filteredPositions } = defineProps([
//   'positions',
//   'devices',
//   'selectedId',
//   'filteredPositions',
// ])
const newCenter = ref([0, 0])

const iniialSelectedtId = computed(() => deviceStore().selectedId)

watch(iniialSelectedtId, () => {
  sessionStore().filteredPositions.map((positions) => {
    if (deviceStore().selectedId) {
      if (positions.deviceId === deviceStore().selectedId) {
        newCenter.value = positions.position
      }
    } else {
      // newCenter.value = sessionStore().filteredPositions[0].position
    }
  })
  if (map.value) {
    map.value.setCenter(newCenter.value)
    map.value.zoomTo(15, {
      duration: 2000,
      // offset: [100, 50]
    })
  }
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
    :logoPosition="'bottom-right'"
    @mb-created="(mapInstance) => (map = mapInstance)"
  >
    <MapboxNavigationControl position="top-right" />
    <MapboxMarker
      v-for="marker in sessionStore().filteredPositions"
      :key="marker.deviceId"
      :lng-lat="marker.position"
      popup
    >
      <template v-slot:popup>
        <div class="content">
          <div class="name-div">
            <span>{{ marker.name ||  marker[0].name  }}</span>
          </div>
          <div class="next-div">
            <div>
              <strong>Status: </strong>
              <small
                :style="
                  marker.status === 'online'
                    ? 'color:green!important;'
                    : 'color:grey;'
                "
                >{{ marker.status }}</small
              >
            </div>
            <div>
              <strong>BatteryLevel: </strong>
              <small>{{ marker.attributes.batteryLevel }}%</small>
            </div>
            <div>
              <strong>Total Distance: </strong>
              <small>{{ marker.attributes.totalDistance }}</small>
            </div>
            <div>
              <strong>Moving: </strong>
              <small>{{ marker.attributes.motion }}</small>
            </div>
          </div>
        </div>
        <!-- <Icon
          icon="bxs:map"
          :class="
            marker.status === 'offline' ? 'offline-pointer' : 'online-pointer'
          "
        /> -->
      </template>
    </MapboxMarker>
  </MapboxMap>
</template>
<style scoped>
.content {
  padding: 1rem;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.name-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.name-div span {
  font-size: 1rem;
  font-weight: 700;
  text-align: left;
}

.next-div {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
}

.next-div div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
}

.next-div small {
  font-size: 0.7rem;
}
</style>
