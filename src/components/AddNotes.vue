<template>
  <GeminiScrollbar>
    <bread-crumb></bread-crumb>
    <div class="add_notes">
      <button @click="getUEContent()">获取内容</button>
      <div class="editor-container">
        <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
      </div>
    </div>
  </GeminiScrollbar>
</template>

<script>
  import BreadCrumb from './public/BreadCrumb';
  import UE from './public/UE';

  export default {
    name: "AddNotes",
    components: {
      BreadCrumb, UE
    },
    data() {
      return {
        defaultMsg: '这里是UE测试',
        config: {
          initialFrameWidth: 1000,
          initialFrameHeight: 350,
          autoFloatEnabled: true
        }
      }
    },
    methods: {
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      }
    }
  }
</script>

<style scoped>
  .add_notes {
    margin: 40px 20px 20px;
  }
</style>
