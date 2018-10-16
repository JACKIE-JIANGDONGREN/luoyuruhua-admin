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
      component: resove => require(['../components/Main'], resove),
      meta: {
        title: '落雨如画后台管理平台-首页'
      },
      children: [
        {
          path: '/',
          name: 'Index',
          component: resove => require(['../components/Index'], resove),
          meta: {
            title: '落雨如画后台管理平台-首页'
          }
        },
        {
          path: 'admin',
          name: 'AdminMain',
          component: resove => require(['../components/AdminMain'], resove),
          meta: {
            title: '落雨如画后台管理平台-管理员列表'
          }
        },
        {
          path: 'addAdmain',
          name: 'AddAdmin',
          component: resove => require(['../components/AddAdmin'], resove),
          meta: {
            title: '落雨如画后台管理平台-添加管理员'
          }
        },
        {
          path: 'changePsw/:id',
          name: 'ChangeAdminPsw',
          component: resove => require(['../components/ChangeAdminPsw'], resove),
          meta: {
            title: '落雨如画后台管理平台-修改密码'
          }
        },
        {
          path: 'userAdmin',
          name: 'UserMain',
          component: resove => require(['../components/UserMain'], resove),
          meta: {
            title: '落雨如画后台管理平台-用户列表'
          }
        },
        {
          path: 'addUser',
          name: 'AddUser',
          component: resove => require(['../components/AddUser'], resove),
          meta: {
            title: '落雨如画后台管理平台-添加用户'
          }
        },
        {
          path: 'notesMain',
          name: 'NotesMain',
          component: resove => require(['../components/NotesMain'], resove),
          meta: {
            title: '落雨如画后台管理平台-随笔列表'
          }
        },
        {
          path: 'addNotes',
          name: 'AddNotes',
          component: resove => require(['../components/AddNotes'], resove),
          meta: {
            title: '落雨如画后台管理平台-添加随笔'
          }
        },
        {
          path: 'editNotes/:id',
          name: 'EditNotes',
          component: resove => require(['../components/EditNotes'], resove),
          meta: {
            title: '落雨如画后台管理平台-编辑随笔'
          }
        },
        {
          path: 'about',
          name: 'About',
          component: resove => require(['../components/About'], resove),
          meta: {
            title: '落雨如画后台管理平台-关于平台'
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
        },
        {
          path: 'comment',
          name: 'ReplyMain',
          component: resove => require(['../components/ReplyMain'], resove),
          meta: {
            title: '落雨如画后台管理平台-评论管理'
          }
        },
        {
          path: 'showreel',
          name: 'ShowReel',
          component: resove => require(['../components/ShowReel'], resove),
          meta: {
            title: '落雨如画后台管理平台-作品集管理'
          }
        },
        {
          path: 'addShowreel',
          name: 'AddShowReel',
          component: resove => require(['../components/AddShowReel'], resove),
          meta: {
            title: '落雨如画后台管理平台-添加作品'
          }
        },
        {
          path: 'editShowreel/:id',
          name: 'EditShowReel',
          component: resove => require(['../components/EditShowReel'], resove),
          meta: {
            title: '落雨如画后台管理平台-编辑作品'
          }
        }
      ]
    }
  ]
})
