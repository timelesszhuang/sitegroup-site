import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Login from '@/components/login/login.vue'
import Admin from '../components/Admin.vue'
import Common from '../components/Common.vue'
import Article from '../components/common/article/index.vue'
import Messagelog from '../components/common/messageLog/messageLog.vue'
import Tdk from '../components/common/tdk/index.vue'
import VueQuillEditor from 'vue-quill-editor'
import Flow from '../components/common/flow/index.vue';
import Keyword from '../components/common/keyword/index.vue';
import Pv from '../components/common/pv/pv.vue';
import Show from '../components/common/show/index.vue';
import Crawler from '../components/common/crawler/crawler.vue';




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
        {path: 'tdk', component: Tdk, name: 'tdk'},
        {path: 'flow',component:Flow,name: 'flow'},
        {path: 'keyword',component:Keyword,name: 'keyword'},
        {path: 'pv',component:Pv,name: 'pv'},
        {path: 'show',component:Show,name: 'show'},
        {path: 'crawler',component:Crawler,name: 'crawler'},
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [


      ]
    }
  ]
})
