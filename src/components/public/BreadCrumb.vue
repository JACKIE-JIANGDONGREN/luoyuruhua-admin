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
  export default {
    name: "BreadCrumb",
    data() {
      return {
        breadcrumbData: []
      }
    },
    mounted() {
      let getRoutesOptions = this.$router.options.routes;
      for (var i = 0; i < getRoutesOptions.length; i++) {
        if (getRoutesOptions[i].children) {
          for (var j = 0; j < getRoutesOptions[i].children.length; j++) {
            if (getRoutesOptions[i].children[j].name == this.$route.name) {
              this.breadcrumbData = getRoutesOptions[i].children[j].breadcrumb;
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .breadcrumb_wrap {
    /*margin: 30px;*/
    padding: 20px;
    border-bottom: solid 2px #CAE7FF;
  }
</style>
