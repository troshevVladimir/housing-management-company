import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import router from "./router";

import directives from '@/utils/directives'

import UIButton from '@/components/ui/UIButton.vue';
import UITabs from '@/components/ui/UITabs.vue';
import UITab from '@/components/ui/UITab.vue';

import "@/styles/index.scss";

const app = createApp(App);

Object.keys(directives).forEach((key) => {
  app.directive(key, directives[key])
})

app.component('UIButton', UIButton)
app.component('ui-tabs', UITabs)
app.component('ui-tab', UITab)

app.use(store);
app.use(router);
app.mount("#app");
