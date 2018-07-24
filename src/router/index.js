import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: resove => require(['../components/Login'], resove),//路由懒加载
      meta: {
        title: '落雨如画后台管理平台-登录',
        auth: true
      }
    },
    {
      path: '/index',
      name: 'Main',
      component: resove => require(['../components/Main'], resove),//路由懒加载
      meta: {
        title: '落雨如画后台管理平台-首页',
        auth: true
      },
      children: [
        {
          path: '/',
          name: 'Index',
          component: resove => require(['../components/Index'], resove),//路由懒加载
          meta: {
            title: '落雨如画后台管理平台-首页',
            auth: true
          }
        }
      ]
    }
  ]
})
