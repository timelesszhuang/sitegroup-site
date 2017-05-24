import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Login from '@/components/login/login.vue'
import Admin from '../components/Admin.vue'
import Common from '../components/Common.vue'
import Article from '../components/common/article/index.vue'
import Messagelog from '../components/common/messageLog/messageLog.vue'
import VueQuillEditor from 'vue-quill-editor'

Vue.use(Router)
Vue.use(ElementUI)
Vue.use(VueQuillEditor)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/common',
      name: 'Common',
      component: Common,
      children: [
        {path: 'article', component: Article, name: 'article'},
        {path: 'messagelog', component: Messagelog, name: 'messagelog'},
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [


      ]
    }
    // { path: '/', name: 'Login', component: Login},
  ]
})
