<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    font-family: '微软雅黑';
  }

  #app {
    width: 100%;
    height: 100%;
    position: relative;
    min-width: 980px;
  }
</style>
