<template>
  <div class="breadcrumb_wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-for="(item,index) in breadcrumbData">
        <el-breadcrumb-item v-if="item.path" :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
        <el-breadcrumb-item v-else>{{item.title}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
  import routerData from '../../../util/breadCrumbConfig';

  export default {
    name: "BreadCrumb",
    data() {
      return {
        breadcrumbData: []
      }
    },
    mounted() {
      for (var i = 0; i < routerData.length; i++) {
        if (routerData[i].name == this.$route.name) {
          this.breadcrumbData = routerData[i].breadcrumb;
        }
      }
    }
  }
</script>

<style scoped>
  .breadcrumb_wrap {
    padding: 20px;
    border-bottom: solid 2px #CAE7FF;
  }
</style>
