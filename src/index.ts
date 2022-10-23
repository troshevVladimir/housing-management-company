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
import UICheckbox from '@/components/ui/UICheckbox.vue';
import UISelect from '@/components/ui/UISelect.vue';
import UIForm from '@/components/ui/UIForm.vue';
import UITable from '@/components/ui/UITable.vue';
import CheckboxBtn from '@/components/ui/CheckboxBtn.vue';
import RadioBtn from '@/components/ui/RadioBtn.vue';
import UIRange from '@/components/ui/UIRange.vue';


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
app.component('ui-checkbox', UICheckbox)
app.component('ui-select', UISelect)
app.component('ui-form', UIForm)
app.component('ui-table', UITable)
app.component('ui-checkbox-btn', CheckboxBtn)
app.component('ui-radio-btn', RadioBtn)
app.component('ui-range', UIRange)

app.use(store);
app.use(router);
app.mount("#app");
