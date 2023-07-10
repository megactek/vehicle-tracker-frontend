import { createPinia } from 'pinia'
import { userData } from '~/store/userData'

const pinia = createPinia()

export default function ({ store, redirect }: { store: any; redirect: any }) {
  const userStore = userData()
  if (userStore.isLoggedIn === false) {
    return redirect('/login')
  }
}
