<template>
  <Html>
    <div>
      <div class="show" v-show="show">
        <loading-app-vue />
      </div>
      <NuxtLayout>
        <NuxtPage keepalive />
      </NuxtLayout>
    </div>
  </Html>
</template>
<script setup>
import LoadingAppVue from './components/LoadingApp.vue'
import { userData } from './store/userData'
const nuxtApp = useNuxtApp()
const show = ref(false)

nuxtApp.hook('page:start', () => {
  addRouteMiddleware(
    'global-loader',
    (to, fro) => {
      show.value = true
      if (!userData().isLoggedIn) {
        if (to.path === '/dashboard' || to.path === '/settings') {
          return navigateTo('/login')
        }
      }
    },
    {
      global: true,
    },
  )
})

nuxtApp.hook('page:finish', () => {
  show.value = false
})
</script>
