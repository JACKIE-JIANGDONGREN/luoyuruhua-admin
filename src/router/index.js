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
        auth: false
      }
    },
    {
      path: '/index',
      name: 'Main',
      component: resove => require(['../components/Main'], resove),
      meta: {
        title: '落雨如画后台管理平台-首页',
        auth: true
      },
      children: [
        {
          path: '',
          name: 'Index',
          component: resove => require(['../components/Index'], resove),
          meta: {
            title: '落雨如画后台管理平台-首页',
            auth: true
          },
          breadcrumb: [
            {
              title: '首页',
              path: '/index'
            }
          ]
        },
        {
          path: 'admin',
          name: 'AdminMain',
          component: resove => require(['../components/AdminMain'], resove),
          meta: {
            title: '落雨如画后台管理平台-管理员列表',
            auth: true
          },
          breadcrumb: [
            {
              title: '首页',
              path: '/index'
            },
            {
              title: '管理员管理',
              path: ''
            },
            {
              title: '管理员列表',
              path: '/index/admin'
            }
          ]
        },
        {
          path: 'addAdmain',
          name: 'AddAdmin',
          component: resove => require(['../components/AddAdmin'], resove),
          meta: {
            title: '落雨如画后台管理平台-添加管理员',
            auth: true
          },
          breadcrumb: [
            {
              title: '首页',
              path: '/index'
            },
            {
              title: '管理员管理',
              path: ''
            },
            {
              title: '添加管理员',
              path: '/index/addAdmain'
            }
          ]
        },
        {
          path: 'userAdmin',
          name: 'UserMain',
          component: resove => require(['../components/UserMain'], resove),
          meta: {
            title: '落雨如画后台管理平台-用户列表',
            auth: true
          },
          breadcrumb: [
            {
              title: '首页',
              path: '/index'
            },
            {
              title: '用户管理',
              path: ''
            },
            {
              title: '用户列表',
              path: '/index/userAdmin'
            }
          ]
        },
        {
          path: 'addUser',
          name: 'AddUser',
          component: resove => require(['../components/AddUser'], resove),
          meta: {
            title: '落雨如画后台管理平台-添加用户',
            auth: true
          },
          breadcrumb: [
            {
              title: '首页',
              path: '/index'
            },
            {
              title: '用户管理',
              path: ''
            },
            {
              title: '添加用户',
              path: '/index/addUser'
            }
          ]
        },
        {
          path: 'notesMain',
          name: 'NotesMain',
          component: resove => require(['../components/NotesMain'], resove),
          meta: {
            title: '落雨如画后台管理平台-随笔列表',
            auth: true
          },
          breadcrumb: [
            {
              title: '首页',
              path: '/index'
            },
            {
              title: '随笔管理',
              path: ''
            },
            {
              title: '随笔列表',
              path: '/index/notesMain'
            }
          ]
        },
        {
          path: 'addNotes',
          name: 'AddNotes',
          component: resove => require(['../components/AddNotes'], resove),
          meta: {
            title: '落雨如画后台管理平台-添加随笔',
            auth: true
          },
          breadcrumb: [
            {
              title: '首页',
              path: '/index'
            },
            {
              title: '随笔管理',
              path: ''
            },
            {
              title: '添加随笔',
              path: '/index/addNotes'
            }
          ]
        },
        {
          path: 'about',
          name: 'About',
          component: resove => require(['../components/About'], resove),
          meta: {
            title: '落雨如画后台管理平台-关于平台',
            auth: true
          },
          breadcrumb: [
            {
              title: '首页',
              path: '/index'
            },
            {
              title: '关于平台',
              path: ''
            }
          ]
        },
        {
          path: 'adminDetail/:id',
          name: 'AdminDetail',
          component: resove => require(['../components/AdminDetail'], resove),
          meta: {
            title: '落雨如画后台管理平台-管理员信息',
            auth: true
          },
          breadcrumb: [
            {
              title: '首页',
              path: '/index'
            },
            {
              title: '管理员信息',
              path: ''
            }
          ]
        },
        {
          path: 'editAdmin/:id',
          name: 'EditAdmin',
          component: resove => require(['../components/EditAdmin'], resove),
          meta: {
            title: '落雨如画后台管理平台-管理员信息',
            auth: true
          },
          breadcrumb: [
            {
              title: '首页',
              path: '/index'
            },
            {
              title: '资料编辑',
              path: ''
            }
          ]
        }
      ]
    }
  ]
})
