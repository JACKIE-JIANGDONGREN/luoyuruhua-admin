<template>
  <div class="main_left">
    <div class="main_left_logo">
    </div>
    <el-menu router :default-active="$route.path" unique-opened background-color="#545c64"
             text-color="#fff" active-text-color="#ffd04b">
      　　　　
      <template v-for="(item , index) in $router.options.routes" v-if="item.menuShow">
        <template v-if="item.hasChild && item.path=='/index'">
          <!--<div>{{item.children}}</div>-->
          <template v-for="(itemChild , index1) in item.children">
            <el-submenu :index="itemChild.path" :key="index1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{itemChild.menuName}}</span>
              </template>
              　　
              <el-menu-item v-for="(itemChilds , indexs) in itemChild.children" :index="'index/'+itemChilds.path" :key="indexs">
                　　{{itemChilds.menuName}}
                　　
              </el-menu-item>
            </el-submenu>
          </template>
        </template>
        　　　　　　　
        <!--<el-menu-item :index="item.path" v-else>
          {{item.menuName}}
          　　
        </el-menu-item>-->
        　　　　
      </template>
      　　
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "LeftSlide",
    data() {
      return {
        isCollapse: false
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
  }

  .main_left .el-menu {
    height: 100%;
  }

  .main_left_logo {
    width: 100%;
    height: 80px;
  }
</style>
