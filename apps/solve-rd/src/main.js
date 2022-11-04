import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "rd-ui-components/dist/rd-ui-components.css"
import "./styles/index.scss"

const app = createApp(App)
app.use(router)
app.mount('#app')
