import { createProxyMiddleware } from 'http-proxy-middleware'

const runtimeConfig = useRuntimeConfig()

// const apiProxy = createProxyMiddleware('/api', {
//   target: `${runtimeConfig.public.api}` as string,
//   changeOrigin: true,
//   pathRewrite: { '^/api/': '/' },
//   ws: true,
//   logLevel: 'debug',
//   secure: true,
// })
// const wsProxy = createProxyMiddleware('/soket', {
//   target: 'wss://demo4.traccar.org/api/socket' as string,
//   onOpen: () => {
//     console.log('ws server opended')
//   },
//   changeOrigin: true,
//   ws: true,
// })

export default defineEventHandler(async (event) => {
  await new Promise<void>((resolve, reject) => {
    const next = (err?: unknown) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    }
    next()
    ////@ts-expect-error
    // apiProxy(event.node.req, event.node.res, next)
    ////@ts-expect-error
    // apiProxy.upgrade(event.node.req, event.node.res, next)
    // wsProxy(event.node.req, event.node.res, next)
    // wsProxy.upgrade
  })
})
