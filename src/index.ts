import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-reboot.min.css";

import "bootstrap";
import { store } from "./store";
import router from "./router";

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");
