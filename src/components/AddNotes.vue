<template>
  <GeminiScrollbar>
    <bread-crumb></bread-crumb>
    <div class="add_notes">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="随笔标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="随笔分类">
          <el-select v-model="form.category" placeholder="请选择类别">
            <el-option label="css" value="0"></el-option>
            <el-option label="javascript" value="1"></el-option>
            <el-option label="jquery" value="2"></el-option>
            <el-option label="vue" value="3"></el-option>
            <el-option label="nodeJS" value="4"></el-option>
            <el-option label="移动端" value="5"></el-option>
            <el-option label="微信小程序" value="6"></el-option>
            <el-option label="其他" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义标签">
          <el-select v-model="form.tag"
                     multiple
                     filterable
                     allow-create
                     default-first-option
                     placeholder="请选择文章标签">
            <el-option label="css" value="css"></el-option>
            <el-option label="javascript" value="javascript"></el-option>
            <el-option label="jquery" value="jquery"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缩略图">
          <div class="com-upload-img">
            <div class="img_group">
              <div class="img_box" id="show_upload">
                <img :src=form.thumbImg alt="">
                <div class="filter">
                  上传
                  <input type="file" accept="image/*" @change="changeImg($event)">
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="随笔内容"></el-form-item>
        <div class="editor-container">
          <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
        </div>
        <el-form-item align="left" class="notes_btm">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="cancel()">取消</el-button>
        </el-form-item>
      </el-form>
      <button @click="getUEContent()">获取内容</button>
      <div v-html="form.content" class="set_style"></div>
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
          initialFrameWidth: 1200,
          initialFrameHeight: 800,
          autoFloatEnabled: true
        },
        form: {
          title: '',
          category: '',
          tag: [],
          thumbImg: '',
          content: ''
        }
      }
    },
    methods: {
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        console.log(content)
        this.form.content = content;
      },
      onSubmit() {
        console.log('submit!');
      },
      cancel() {
        this.$router.push({name: 'NotesMain'})
      },
      changeImg: function (e) {
        let _this = this;
        let imgLimit = 1024;
        let files = e.target.files;
        let image = new Image();
        if (files.length > 0) {
          let dd = 0;
          let timer = setInterval(function () {
            if (files.item(dd).type != 'image/png' && files.item(dd).type != 'image/jpeg' && files.item(dd).type != 'image/gif') {
              return false;
            }

            if (files.item(dd).size > imgLimit * 1000) {
              _this.$notify({
                title: '警告',
                message: '图片大小不得超过2MB',
                type: 'error'
              });
              //to do sth
            } else {
              image.src = window.URL.createObjectURL(files.item(dd));
              image.onload = function () {
                // 默认按比例压缩
                let w = 100,
                  h = 100,
                  scale = w / h;
                w = 120;
                h = w / scale;
                // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
                let quality = 0.7;
                //生成canvas
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                // 创建属性节点
                let anw = document.createAttribute("width");
                anw.nodeValue = w;
                let anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(image, 0, 0, w, h);
                let ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();//图片格式
                let base64 = canvas.toDataURL("image/" + ext, quality);
                _this.form.thumbImg = base64;
                _this.url = '';
              }
            }

            if (dd < files.length - 1) {
              dd++;
            } else {
              clearInterval(timer);
            }
          }, 1000)
        }
      },
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .add_notes {
    margin: 40px 20px 20px;
  }

  .editor-container {
    padding-left: 112px;
  }

  .notes_btm {
    padding: 50px 10px 70px;
  }

  #show_upload {
    width: 320px;
    height: 180px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    overflow: hidden;
    position: relative;
    border: 1px solid #e5e6e7;
  }

  .filter {
    position: absolute;
    width: 65px;
    height: 35px;
    text-align: center;
    bottom: 0;
    right: 0;
    display: inline-block;
    line-height: 35px;
    white-space: nowrap;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    color: #fff;
    -webkit-appearance: none;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    font-size: 14px;
    border-radius: 4px;
    background-color: #409eff;
    border-color: #409eff;
  }

  .filter input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    -webkit-cursor: pointer;
  }

  #show_upload > img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .set_style >>> p {
    letter-spacing: 20px;
    color: #f00;
  }
</style>
