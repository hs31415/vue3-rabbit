import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyPlugin } from '@/directives'

import '@/styles/commen.scss'

import App from './App.vue'
import router from './router'



const app = createApp(App)

app.use(createPinia())
app.use(lazyPlugin)

app.use(router)

app.mount('#app')
