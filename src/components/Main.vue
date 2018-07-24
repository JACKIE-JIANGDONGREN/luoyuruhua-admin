<template>
  <div class="main_wrap">
    <left-slide></left-slide>
    <div class="main_right">
      <router-view/>
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
    height: 100%;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
    /*min-height: 400px;*/
  }

</style>
