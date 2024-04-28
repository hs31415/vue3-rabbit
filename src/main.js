import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyPlugin } from '@/directives'
import { componentsPlugin } from '@/components'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@/styles/commen.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(lazyPlugin)
app.use(componentsPlugin)

app.use(router)

app.mount('#app')
