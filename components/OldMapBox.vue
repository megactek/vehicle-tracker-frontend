<template>
  <main class="w-screen h-screen">
    <client-only>
      <mgl-map
        class="w-full h-full"
        :class="{
          'opacity-75 cursor-not-allowed': loading,
        }"
        :mapbox-gl="mapboxgl"
        :access-token="mapOptions.accessToken"
        :map-style.sync="mapOptions.style"
        :center="mapOptions.center"
        :zoom="mapOptions.zoom"
        :max-zoom="mapOptions.maxZoom"
        :cross-source-collisions="false"
        :fail-if-major-performance-caveat="false"
        :preserve-drawing-buffer="true"
        :hash="false"
        :min-pitch="0"
        :max-pitch="60"
        @load="onMapLoad"
      >
        <mgl-geojson-layer
          v-if="!loading"
          :source-id="'geojson-source'"
          :source="getGeoJsonSource()"
          :layer-id="'geojson-layer'"
          :layer="getGeoJsonLayer()"
          :clear-source="true"
          :replace="true"
        />
        <div class="absolute left-0 top-0 mt-2 ml-2">
          <span class="relative z-0 inline-flex shadow-sm rounded-md">
            <button
              type="button"
              class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              :class="
                styles.selected.enabled && styles.selected.type === 'Satellite'
                  ? 'bg-indigo-400 hover:bg-indigo-500'
                  : 'hover:bg-gray-50'
              "
              @click="setStyle('Satellite')"
            >
              Satellite
            </button>
            <button
              type="button"
              class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              :class="
                styles.selected.enabled && styles.selected.type === 'Streets'
                  ? 'bg-indigo-400 hover:bg-indigo-500'
                  : 'hover:bg-gray-50'
              "
              @click="setStyle('Streets')"
            >
              Streets
            </button>
            <button
              type="button"
              class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              :class="
                styles.selected.enabled && styles.selected.type === 'Dark'
                  ? 'bg-indigo-400 hover:bg-indigo-500'
                  : 'hover:bg-gray-50'
              "
              @click="setStyle('Dark')"
            >
              Dark
            </button>
          </span>
        </div>
      </mgl-map>
    </client-only>
  </main>
</template>
<script>
import { MglMap, MglGeojsonLayer } from 'v-mapbox'
import mapboxgl from 'mapbox-gl'
export default {
  name: 'App',
  components: {
    MglMap,
    MglGeojsonLayer,
  },
  data() {
    return {
      mapboxgl,
      mapState: {
        loaded: false,
        styleChanged: false,
      },
      mapOptions: {
        accessToken:
          'pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ',
        style: 'mapbox://styles/mapbox/satellite-streets-v11?optimize=true',
        center: [78.96, 20.59],
        zoom: 1,
        maxZoom: 22,
      },
      mapLayers: {
        geojson: 'https://api.npoint.io/9522693a27bc48c29a68',
      },
      styles: {
        selected: {
          type: 'Satellite',
          enabled: true,
          style: 'mapbox://styles/mapbox/satellite-streets-v11?optimize=true',
        },
        available: [
          {
            type: 'Streets',
            enabled: false,
            style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
          },
          {
            type: 'Satellite',
            enabled: true,
            style: 'mapbox://styles/mapbox/satellite-streets-v11?optimize=true',
          },
          {
            type: 'Dark',
            enabled: false,
            style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
          },
        ],
      },
    }
  },
  computed: {
    loading() {
      return !this.mapState.loaded || !this.mapState.styleChanged
    },
  },
  methods: {
    getGeoJsonSource() {
      return {
        type: 'geojson',
        data: this.mapLayers.geojson,
      }
    },
    getGeoJsonLayer() {
      return {
        id: 'geojson-layer',
        type: 'fill',
        source: 'geojson-source',
        paint: {
          'fill-color': '#f08',
          'fill-opacity': 0.75,
        },
        layout: {
          visibility: this.loading ? 'none' : 'visible',
        },
        maxzoom: 22,
      }
    },
    onMapLoad({ map }) {
      this.map = map
      map.on('style.load', () => {
        const waiting = () => {
          if (!map.isStyleLoaded()) {
            this.mapState.styleChanged = false
            setTimeout(waiting, 200)
          } else {
            this.mapState.styleChanged = true
          }
        }
        waiting()
      })
      this.mapState.loaded = true
      this.mapState.styleChanged = true
    },
    setStyle(style) {
      if (this.mapState.loaded) {
        const selected = this.styles.available.find((s) => s.type === style)
        this.styles.selected = { ...selected, enabled: true }
        this.map.setStyle(selected.style)
      }
    },
  },
}
</script>
<style scoped></style>
