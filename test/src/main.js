import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
Vue.use(ElementUI);
Vue.config.productionTip = false;

//引入datav
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import _ from "loadsh";
// Vue.use(_);
Vue.prototype._ = _;

import { sqrt } from 'mathjs'
Vue.prototype.sqrt = sqrt;


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
