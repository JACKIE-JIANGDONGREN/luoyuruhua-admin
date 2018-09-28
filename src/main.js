// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import axios from 'axios'; // 引入请求axios
import GeminiScrollbar from 'vue-gemini-scrollbar';  // 自定义滚动条
import NProgress from 'nprogress'; // 路由加载进度

import Config from '../util/config';

import store from './vuex/store';
import Cookie from '../util/cookieConfg';  // 配置cookie


// 引入后台框架 element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '../static/ueditor/ueditor.config';
import '../static/ueditor/ueditor.all';
import '../static/ueditor/ueditor.parse';
import '../static/ueditor/lang/zh-cn/zh-cn';


import 'public_css/clear.css';
import 'nprogress/nprogress.css';

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(GeminiScrollbar);


Vue.prototype.$http = axios;
Vue.prototype.cookie = Cookie;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  NProgress.start();
  window.document.title = to.meta.title;
  if (to.matched.length === 0) {
    from.name ? next({name: from.name}) : next('/');
  } else {
    if (Cookie.getCookie('user') != 0) { //如果有就直接到首页咯
      next();
    } else {
      if (to.path == '/') {
        next();
      } else {
        next({path: '/', replace: true});
      }
    }
  }
});

router.afterEach(transition => {
  window.scrollTo(0, 0);
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
