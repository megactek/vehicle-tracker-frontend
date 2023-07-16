<template>
  <div class="show" v-show="show">
    <loading-app-vue />
  </div>
</template>
<script setup>
import LoadingAppVue from './components/LoadingApp.vue'
import { userData } from './store/userData'
const nuxtApp = useNuxtApp()
const show = ref(false)

addRouteMiddleware(
  'global-loader',
  () => {
    show.value = true
    if (!userData().isLoggedIn) {
      return navigateTo('/login')
    }
  },
  {
    global: true,
  },
)

nuxtApp.hook('page:finish', () => {
  show.value = false
})
</script>
