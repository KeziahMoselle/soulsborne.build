import type { App } from 'vue'
import Vue3Marquee from 'vue3-marquee'

export default (app: App) => {
  app.use(Vue3Marquee, { name: 'Marquee' })
}
