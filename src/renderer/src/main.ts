import './web-api-shim' // Load web API shim for browser compatibility
import './firebase' // Initialize Firebase
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@mdi/font/css/materialdesignicons.css'
import './style/index.css'
// import '@vueform/multiselect/themes/default.css'
import './style/multiselect.postcss'

const app = createApp(App)
app.use(router)
app.mount('#app')
