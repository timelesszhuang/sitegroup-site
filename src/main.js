// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import cookie from 'js-cookie'
import '@/assets/css/reset.css'
import axios from 'axios'

Vue.config.productionTip = false
Window.host = 'http://www.app.com'
Window.cookie = cookie
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
