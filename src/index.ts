import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import router from "./router";
import directives from '@/utils/directives'
declare let window: any;

export default function () {
  const app = createApp(App);

  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key])
  })

  app.use(store);
  app.use(router);
  app.mount("#app");

  (async (r, a, s) => {
    const storeInitialState = window.INITIAL_DATA;

    await r.isReady();

    if (storeInitialState) {
      s.replaceState(storeInitialState);
    }

    a.mount("#app", true);
  })(router, app, store);
}
