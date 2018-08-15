<template>
  <div class="main_left">
    <div class="main_left_logo" style="text-align: center;">
      <router-link :to="{name:'Index'}" tag="p" v-if="$store.state.spreadInfo">lyrh</router-link>
      <router-link :to="{name:'Index'}" tag="p" v-else>lyrh博客</router-link>
    </div>
    <el-menu router :default-active="$route.path" unique-opened background-color="#545c64" class="el-menu-vertical-demo"
             :collapse="$store.state.spreadInfo"
             text-color="#fff" active-text-color="#ffd04b">
      <template v-for="(item,index) in slideData">
        <el-submenu :index="item.path" :key="index" v-if="item.hasChild">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.menuName}}</span>
          </template>
          <el-menu-item v-for="(childItem,childIndex) in item.children" :index="childItem.path" :key="childIndex">
            　　{{childItem.menuName}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.path" :key="index">
          <i :class="item.icon"></i>
          <span>{{item.menuName}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "LeftSlide",
    data() {
      return {
        isCollapse: this.$store.state.spreadInfo,
        slideData: [
          {
            menuName: '管理员管理',
            path: '/admin',
            hasChild: true,
            icon: 'el-icon-star-off',
            children: [
              {
                menuName: '管理员列表',
                path: '/index/admin'
              },
              {
                menuName: '添加管理员',
                path: '/index/addAdmain'
              }
            ]
          },
          {
            menuName: '用户管理',
            icon: 'el-icon-edit',
            path: '/user',
            hasChild: true,
            children: [
              {
                menuName: '用户列表',
                path: '/index/userAdmin'
              },
              {
                menuName: '添加用户',
                path: '/index/addUser'
              }
            ]
          },
          {
            menuName: '随笔管理',
            path: '/notes',
            hasChild: true,
            icon: 'el-icon-view',
            children: [
              {
                menuName: '随笔列表',
                path: '/index/notesMain'
              },
              {
                menuName: '添加随笔',
                path: '/index/addNotes'
              }
            ]
          },
          {
            menuName: '关于平台',
            path: '/index/about',
            hasChild: false,
            icon: 'el-icon-location-outline'
          }
        ]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .main_left {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgb(84, 92, 100);
  }

  .main_left .el-menu {
    border-right: none !important;
  }

  .main_left_logo {
    width: 100%;
    height: 70px;
    text-align: center;
  }

  .main_left_logo p {
    line-height: 70px;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
  }
</style>
