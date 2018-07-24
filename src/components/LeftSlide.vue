<template>
  <div class="main_left">
    <div class="main_left_logo">
    </div>
    <!--<el-menu router :default-active="123" unique-opened background-color="#545c64"
             text-color="#fff" active-text-color="#ffd04b">
      <el-submenu :index="123" :key="456">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>123456</span>
        </template>　
        <el-menu-item :index="123" :key="465">
          　　123
        </el-menu-item>
      </el-submenu>
    </el-menu>-->
    <router-link :to="{name:'About',params:{id:'123'}}" tag="p">linkto</router-link>
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
    position: absolute;
    left: 0;
    top: 0;
  }

  .main_left .el-menu {
    height: 100%;
  }

  .main_left_logo {
    width: 100%;
    height: 80px;
  }
</style>
