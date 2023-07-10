import { userData } from '~/store/userData'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      //@ts-expect-error
      store: userData($pinia),
    },
  }
})
