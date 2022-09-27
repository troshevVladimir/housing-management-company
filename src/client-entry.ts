import { createSSRApp } from 'vue'
import App from './App.vue'

// логика инициализации, специфичная для клиента...

const app = createSSRApp(App)

// это предполагает, что в шаблоне App.vue будет корневой элемент с `id="app"`
app.mount('#app')