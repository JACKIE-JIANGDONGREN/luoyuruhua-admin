import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      menuName: '登录',
      menuShow: true,
      hasChild: false,
      component: resove => require(['../components/Login'], resove),//路由懒加载
      meta: {
        title: '落雨如画后台管理平台-登录',
        auth: true
      }
    },
    {
      path: '/index',
      name: 'Index',
      menuName: '首页',
      menuShow: true,
      hasChild: true,
      component: resove => require(['../components/Main'], resove),//路由懒加载
      meta: {
        title: '落雨如画后台管理平台-首页',
        auth: true
      },
      children: [
        {
          path: 'staff',
          menuName: '员工/福粒',
          menuShow: true,
          hasChild: true,
          children: [
            {
              path: 'staffList',
              menuName: '员工列表',
              component: resove => require(['../components/AdminMain'], resove),//路由懒加载
            }
          ]
        },
        {
          path: '/commodity',
          menuName: '商品管理',
          menuShow: true,
          hasChild: true,
          children: [
            {
              path: 'commodityList',
              menuName: '商品列表'
            }
          ]
        },
        {
          path: '/system',
          menuName: '系统管理',
          menuShow: true,
          hasChild: true,
          children: [
            {
              path: 'personInfo',
              menuName: '个人资料'
            },
            {
              path: 'changePassword',
              menuName: '修改密码'
            }
          ]
        }
      ]
    }
  ]
})
