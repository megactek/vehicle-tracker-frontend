import { deviceStore } from '~/store/device'
import { sessionStore } from '~/store/sessions'
import { userData } from '~/store/userData'

export default (devices: any, positions: any) => {
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
        } else if (
          devices.length ||
          !devices ||
          Object.keys(devices).length === 0
        ) {
          const tempDdevice = userData().devices.filter(
            (device: any) => device.id === position.deviceId,
          )
          device = tempDdevice.reduce((acc: any, item: any, index: any) => {
            acc[index] = item
            return acc
          }, {})
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
