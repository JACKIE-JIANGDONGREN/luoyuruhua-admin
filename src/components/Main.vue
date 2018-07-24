<template>
  <div class="main_wrap">
    <left-slide></left-slide>
    <div class="main_right" style="margin-left: 200px;background: #ff0;height: 100%;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import LeftSlide from './LeftSlide';

  export default {
    data() {
      return {
        isCollapse: true
      };
    },
    components: {
      LeftSlide
    },
    methods: {}
  }
</script>
<style scoped>
  .main_wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
    /*min-height: 400px;*/
  }

</style>
