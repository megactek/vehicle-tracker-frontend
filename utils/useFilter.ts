import { deviceStore } from '~/store/device'
import { sessionStore } from '~/store/sessions'
import { userData } from '~/store/userData'

export default (devices: any, positions: any) => {
  console.log(devices, positions)
  // let devices = deviceStore().items
  // if (!devices) {
  //   devices = userData().devices
  // }
  // const positions = sessionStore().positions
  const mergedData = Object.keys(positions)
    .map((positionKey: any) => {
      if (positions[positionKey]) {
        const position = positions[positionKey]
        let device: any

        if (devices[position.deviceId]) {
          device = devices[position.deviceId]
        } else if (devices.length) {
          //@ts-expect-error
          device = deviceStore().items[position.deviceId]
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
  console.log(mergedData)
  return mergedData
}
