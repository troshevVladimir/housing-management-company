import { createSSRApp, h } from "vue";
import App from "./App.vue";
import { store } from "./store";
import router from "./router";

export default function() {

  const rootComponent = {
    render: () => h(App),
    components: { App }
  };

  const app = createSSRApp(rootComponent);

  app.use(router);
  app.use(store);

  return { app, router, store }
}