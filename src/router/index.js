import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Login from '@/components/login/login.vue'
import Admin from '../components/Admin.vue'
import Common from '../components/Common.vue'
import Article from '../components/common/article/index.vue'
import Messagelog from '../components/common/messageLog/messageLog.vue'
import Tdkall from '../components/common/tdkall/tab.vue'
import Articletdk from '../components/common/articletdk/index.vue'
import VueQuillEditor from 'vue-quill-editor'
import Flow from '../components/common/flow/index.vue';
import Keyword from '../components/common/keyword/index.vue';
import Pv from '../components/common/pv/pv.vue';
import Show from '../components/common/show/index.vue';
import Crawler from '../components/common/crawler/crawler.vue';
import Count from '../components/common/count/index.vue';
import Href from '../components/common/href/index.vue'
import Hrefreplace from '../components/common/hrefreplace/index.vue'
import Substitution from '../components/common/substitution/index.vue'
import Staticconfig from '../components/common/staticconfig/index.vue'
import Weixinarticle from '../components/common/wechatarticle/index.vue'
import News from '../components/common/news/tab.vue'


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
        {path: 'tdkall', component: Tdkall, name: 'tdkall'},
        {path: 'articletdk', component: Articletdk, name: 'articletdk'},
        {path: 'flow', component: Flow, name: 'flow'},
        {path: 'keyword', component: Keyword, name: 'keyword'},
        {path: 'pv', component: Pv, name: 'pv'},
        {path: 'show', component: Show, name: 'show'},
        {path: 'crawler', component: Crawler, name: 'crawler'},
        {path: 'count', component: Count, name: 'count'},
        {path: 'href', component: Href, name: 'href'},
        {path: 'hrefreplace', component: Hrefreplace, name: 'hrefreplace'},
        {path: 'substitution', component: Substitution, name: 'substitution'},
        {path: 'staticconfig', component: Staticconfig, name: 'staticconfig'},
        {path: 'weixinarticle', component: Weixinarticle, name: 'weixinarticle'},
        {path: 'news', component: News, name: 'news'},
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: []
    }
  ]
})
