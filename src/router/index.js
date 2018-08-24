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
        title: '落雨如画后台管理平台-登录'
      }
    },
    {
      path: '/index',
      name: 'Main',
      component: resove => require(['../components/Main'], resove),
      meta: {
        title: '落雨如画后台管理平台-首页'
      },
      children: [
        {
          path: '',
          name: 'Index',
          component: resove => require(['../components/Index'], resove),
          meta: {
            title: '落雨如画后台管理平台-首页',
            keepAlive: true
          }
        },
        {
          path: 'admin',
          name: 'AdminMain',
          component: resove => require(['../components/AdminMain'], resove),
          meta: {
            title: '落雨如画后台管理平台-管理员列表',
            keepAlive: false
          }
        },
        {
          path: 'addAdmain',
          name: 'AddAdmin',
          component: resove => require(['../components/AddAdmin'], resove),
          meta: {
            title: '落雨如画后台管理平台-添加管理员',
            keepAlive: false
          }
        },
        {
          path: 'changePsw/:id',
          name: 'ChangeAdminPsw',
          component: resove => require(['../components/ChangeAdminPsw'], resove),
          meta: {
            title: '落雨如画后台管理平台-修改密码',
            keepAlive: false
          }
        },
        {
          path: 'userAdmin',
          name: 'UserMain',
          component: resove => require(['../components/UserMain'], resove),
          meta: {
            title: '落雨如画后台管理平台-用户列表',
            keepAlive: false
          }
        },
        {
          path: 'addUser',
          name: 'AddUser',
          component: resove => require(['../components/AddUser'], resove),
          meta: {
            title: '落雨如画后台管理平台-添加用户',
            keepAlive: false
          }
        },
        {
          path: 'notesMain',
          name: 'NotesMain',
          component: resove => require(['../components/NotesMain'], resove),
          meta: {
            title: '落雨如画后台管理平台-随笔列表',
            keepAlive: false
          }
        },
        {
          path: 'addNotes',
          name: 'AddNotes',
          component: resove => require(['../components/AddNotes'], resove),
          meta: {
            title: '落雨如画后台管理平台-添加随笔',
            keepAlive: false
          }
        },
        {
          path: 'about',
          name: 'About',
          component: resove => require(['../components/About'], resove),
          meta: {
            title: '落雨如画后台管理平台-关于平台',
            keepAlive: true
          }
        },
        {
          path: 'adminDetail/:id',
          name: 'AdminDetail',
          component: resove => require(['../components/AdminDetail'], resove),
          meta: {
            title: '落雨如画后台管理平台-管理员信息'
          }
        },
        {
          path: 'editAdmin/:id',
          name: 'EditAdmin',
          component: resove => require(['../components/EditAdmin'], resove),
          meta: {
            title: '落雨如画后台管理平台-管理员信息'
          }
        },
        {
          path: 'editUser/:id',
          name: 'EditUser',
          component: resove => require(['../components/EditUser'], resove),
          meta: {
            title: '落雨如画后台管理平台-编辑用户'
          }
        }
      ]
    }
  ]
})
