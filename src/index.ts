import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap";
import { store } from "./store";
import router from "./router";
import directives from '@/utils/directives'

const app = createApp(App);

Object.keys(directives).forEach((key) => {
  app.directive(key, directives[key])
})

app.use(store);
app.use(router);
app.mount("#app");
