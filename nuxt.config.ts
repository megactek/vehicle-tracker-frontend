// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: [
    'ant-design-vue/dist/antd.css',
    '@/assets/css/main.css',
    'mapbox-gl/dist/mapbox-gl.css',
  ],
  plugins: ['@/plugins/antd-ui', '@/plugins/ws'],
  runtimeConfig: {
    public: {
      mapBoxKey: process.env.NUXT_MAPBOX_API_KEY,
      api: process.env.API,
      wsApi: process.env.WSAPI,
    },
  },
  components: true,
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        types: ['@pinia/nuxt'],
      },
    },
  },
})
