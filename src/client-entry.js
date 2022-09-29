import { createApp } from './app.js';
import { createWebHistory } from 'vue-router'
import createRouter from './router/index.js'
import { store } from './store/index.ts';
const router = createRouter(createWebHistory())

const app = createApp();
app.use(router);
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
app.use(store)

router.isReady().then(() => {
  app.mount('#app')
})
