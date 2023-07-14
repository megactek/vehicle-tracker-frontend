import { deviceStore } from '~/store/device'
import { sessionStore } from '~/store/sessions'
import { userData } from '~/store/userData'

export default () => {
  let devices = deviceStore().items
  if (!devices) {
    devices = userData().devices
  }
  const positions = sessionStore().positions
  const mergedData = Object.keys(positions)
    .map((positionKey: any) => {
      //@ts-expect-error
      if (positions[positionKey]) {
        //@ts-expect-error
        const position = positions[positionKey]
        let device: any
        //@ts-expect-error
        if (devices[position.deviceId]) {
          //@ts-expect-error
          device = devices[position.deviceId]
        }

        if (device) {
          return {
            ...device,
            ...position,
            position: [position.longitude, position.latitude],
          }
        }
      }

      return null
    })
    .filter((data) => data !== null)
  return mergedData
}
