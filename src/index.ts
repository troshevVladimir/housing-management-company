import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import router from "./router";
import directives from '@/utils/directives'

import UIButton from '@/components/ui/UIButton.vue';
import UIAccordions from '@/components/ui/UIAccordions.vue';
import UIAccordion from '@/components/ui/UIAccordion.vue';
import UIInput from '@/components/ui/UIInput.vue';
import UITab from '@/components/ui/UITab.vue';
import UITabs from '@/components/ui/UITabs.vue';

import "@/styles/index.scss";

const app = createApp(App);

Object.keys(directives).forEach((key) => {
  app.directive(key, directives[key])
})

app.component('ui-button', UIButton)
app.component('ui-accordions', UIAccordions)
app.component('ui-accordion', UIAccordion)
app.component('ui-input', UIInput)
app.component('ui-tab', UITab)
app.component('ui-tabs', UITabs)

app.use(store);
app.use(router);
app.mount("#app");
