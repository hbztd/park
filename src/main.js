import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import axios from 'axios';
import qs from 'qs'
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
// 暂时只在register login seat 验证数据有限性

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

