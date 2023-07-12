import { userData } from '~/store/userData'


export default defineNuxtRouteMiddleware ( (to, from ) =>  {
  const userStore = userData()
  if (userStore.isLoggedIn === false) {
    return navigateTo('/login')
  }
})
