<template>
  <div class="main_wrap">
    <left-slide></left-slide>
    <div class="main_right" :class="$store.state.spreadInfo?'margin_left_default':'margin_left_spread'">
      <right-slide-top></right-slide-top>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import LeftSlide from './LeftSlide';
  import RightSlideTop from './RightSlideTop';

  export default {
    data() {
      return {
        isCollapse: true
      };
    },
    components: {
      LeftSlide, RightSlideTop
    },
    methods: {},
    created() {
    },
    mounted() {
    }
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
    min-height: 400px;
  }

  .main_right {
    transition: all .25s ease-in 0s;
    -webkit-transition: all .25s ease-in 0s;
    position: relative;
    height: 100%;
    background: #fff;
    padding-top: 70px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .margin_left_default {
    margin-left: 64px;
  }

  .margin_left_spread {
    margin-left: 200px;
  }
</style>
