// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Multiselect from "vue-multiselect";
import store from "./store";
import VeeValidate from "vee-validate";
import {
  Datepicker,
  Timepicker,
  DatetimePicker,
  DateRangePicker
} from "@livelybone/vue-datepicker";

// Global register
Vue.component("datepicker", Datepicker);
Vue.component("timepicker", Timepicker);
Vue.component("datetime-picker", DatetimePicker);
Vue.component("date-range-picker", DateRangePicker);
Vue.use(VeeValidate);
Vue.component("multiselect", Multiselect);
import vSelect from "vue-select";
import { TreeViewPlugin } from "@syncfusion/ej2-vue-navigations";

Vue.use(TreeViewPlugin);
Vue.component("v-select", vSelect);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
