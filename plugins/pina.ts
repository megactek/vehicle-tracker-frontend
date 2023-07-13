import { userData } from '~/store/userData'
// import { useWebSocketStore } from '~/plugins/ws'
import { sessionStore } from '~/store/sessions'
import { deviceStore } from '~/store/device'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      //@ts-expect-error
      userStore: userData($pinia),
      ////@ts-expect-error
      // wsStore: useWebSocketStore($pinia),
      //@ts-expect-error
      deviceStore: deviceStore($pinia),
      //@ts-expect-error
      sessionStore: sessionStore($pinia),
    },
  }
})
