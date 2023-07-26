import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'rd-components/dist/rd-ui-components.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
