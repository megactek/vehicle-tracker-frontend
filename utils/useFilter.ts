import { deviceStore } from '~/store/device'
import { sessionStore } from '~/store/sessions'

export default () => {
  const devices = deviceStore().items
  const positions = sessionStore().positions
  const mergedData = Object.keys(positions)
    .map((positionKey: any) => {
      if (positions[positionKey]) {
        const position = positions[positionKey]
        let device: any
        if (devices[position.deviceId]) {
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
