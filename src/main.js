import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// plugins
import "./plugins/bootstrap-vue";

import Private from "./layouts/Private.vue";
import Public from "./layouts/Public.vue";
Vue.component("private", Private);
Vue.component("public", Public);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
