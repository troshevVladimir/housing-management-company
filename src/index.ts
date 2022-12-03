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
import CheckboxBtn from '@/components/ui/CheckboxBtn.vue';
import RadioBtn from '@/components/ui/RadioBtn.vue';
import UIRange from '@/components/ui/UIRange.vue';
import UIFileInput from '@/components/ui/UIFileInput.vue';
import UIDatapicker from '@/components/ui/UIDatapicker.vue';
import UIZip from '@/components/ui/UIZip.vue';

import "@/styles/index.scss";

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPhone, faArrowRight, faArrowUpRightFromSquare, faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faPhone, faArrowRight, faArrowUpRightFromSquare, faPlus, faMinus);
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
app.component('ui-checkbox-btn', CheckboxBtn)
app.component('ui-radio-btn', RadioBtn)
app.component('ui-range', UIRange)
app.component('ui-file-input', UIFileInput)
app.component('ui-data-picker', UIDatapicker)
app.component('ui-zip', UIZip)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(store);
app.use(router);
app.mount("#app");
