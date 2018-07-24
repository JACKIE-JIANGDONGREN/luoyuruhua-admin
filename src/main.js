// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import axios from 'axios';

import store from './vuex/store';
import Cookie from '../util/cookieConfg';


// 引入后台框架 element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import 'public_css/clear.css';

Vue.use(Vuex);
Vue.use(ElementUI);


Vue.prototype.$http = axios;
Vue.prototype.cookie = Cookie;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  if (Cookie.getCookie('user')) { //如果有就直接到首页咯
    next();
  } else {
    if (to.path == '/') {
      next();
    } else {
      next({path: '/', replace: true});
    }
  }
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
