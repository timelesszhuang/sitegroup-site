// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Cookies from 'js-cookie'
import axios from 'axios'
import Lockr from 'lockr'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import moment from 'moment'

Vue.use(iView);
window.Cookies = Cookies
window.axios = axios

let domain = 'sitegroup.youdao.so'
var HOST = 'http://' + domain + '/index.php/'
var ROOTHOST = 'http://' + domain + '/'

axios.defaults.baseURL = HOST
axios.defaults.timeout = 1000 * 15
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true
window.moment = moment
window.HOST = HOST
window.ROOTHOST = ROOTHOST
window.router = router
window.Cookies = Cookies
window.Lockr = Lockr
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
