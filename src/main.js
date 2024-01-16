import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// CSS REST
import '@unocss/reset/eric-meyer.css'
// UNOCSS
import 'virtual:uno.css'
import 'sweetalert2/dist/sweetalert2.min.css';
// My CSS
import './assets/main.scss'
const app = createApp(App)
app.use(router)
// app.use(VueSweetalert2);
app.mount('#app')
