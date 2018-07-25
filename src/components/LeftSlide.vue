<template>
  <div class="main_left">
    <div class="main_left_logo">
      <span style="color: #fff;">{{$route.path}}</span>
    </div>
    <el-menu router :default-active="$route.path" unique-opened background-color="#545c64"
             text-color="#fff" active-text-color="#ffd04b">
      <template v-for="(item,index) in slideData">
        <el-submenu :index="item.path" :key="index" v-if="item.hasChild">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.menuName}}</span>
          </template>
          <el-menu-item v-for="(childItem,childIndex) in item.children" :index="childItem.path" :key="childIndex">
            　　{{childItem.menuName}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.path" :key="index">
          <i class="el-icon-location"></i>
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
        isCollapse: false,
        slideData: [
          {
            menuName: '管理员管理',
            path: '/admin',
            hasChild: true,
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
            hasChild: false
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
      console.log(this.$router)
    }
  }
</script>

<style scoped>
  .main_left {
    width: 200px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgb(84, 92, 100);
  }

  .main_left .el-menu {
    width: 200px;
  }

  .main_left_logo {
    width: 100%;
    height: 70px;
  }
</style>
