<template>
  <GeminiScrollbar>
    <bread-crumb></bread-crumb>
    <div class="add_type">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="相册名称" prop="title" style="width: 500px;">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="相册封面">
          <div class="com-upload-img">
            <div class="img_group">
              <div class="img_box" id="show_upload" v-loading="loading"
                   element-loading-text="上传中"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0, 0, 0, 0.8)">
                <img :src=form.thumbImg alt="">
                <div class="filter">
                  上传
                  <input type="file" accept="image/*" @change="changeImg($event)">
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="相册介绍" prop="description" style="width: 500px;">
          <el-input type="textarea" v-model="form.description" rows="6" placeholder="建议10到50字符"></el-input>
        </el-form-item>
        <el-form-item align="left" class="notes_btm">
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button @click="cancel()">取消</el-button>
        </el-form-item>
      </el-form>
  </div>
  </GeminiScrollbar>
</template>

<script>
  import BreadCrumb from './public/BreadCrumb';

  export default {
    name: "AddImgKind",
    data() {
      return {
        loading: false,
        form: {
          title: '',
          thumbImg: require('../assets/public/noimg.gif'),
          description: '',
        },
        rules: {
          title: [
            {required: true, message: '请输入相册名称', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入相册概要', trigger: 'blur'}
          ]
        }
      }
    },
    components: {
      BreadCrumb
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addImgType();
          } else {
            this.$notify({
              title: '警告',
              message: '请完善所需要的信息！',
              type: 'warning'
            });
            return false;
          }
        });
      },
      cancel() {
        this.$router.push({name: 'Album'})
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

            if (files.item(dd).size > imgLimit * 2000) {
              _this.$notify({
                title: '警告',
                message: '图片大小不得超过2MB',
                type: 'error'
              });
              //to do sth
            } else {
              _this.loading = true;
              image.src = window.URL.createObjectURL(files.item(dd));
              image.onload = function () {
                // 默认按比例压缩
                let w = image.width,
                  h = image.height,
                  scale = w / h;
                // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
                let quality = 0.8;
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
                _this.uploadThumbImg(base64);
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
      uploadThumbImg(baseData) {
        this.$http({
          method: 'post',
          url: '/thumbPhotoType',
          data: {
            thumbImg: baseData
          }
        }).then(data => {
          this.$message({
            message: '上传成功',
            type: 'success'
          });
          this.loading = false;
          this.form.thumbImg = data.data.thumbImg;
        }).catch(err => {
          this.loading = false;
          this.$message.error('上传失败，请联系管理员！');
          console.log(err)
        })
      },
      addImgType() {
        this.$http({
          method: 'post',
          url: '/addImgType',
          data: {
            name: this.cookie.getCookie('user'),
            form: this.form
          }
        }).then(data => {
          if (data.data.code == '200') {
            this.$notify({
              title: '成功',
              message: data.data.des,
              type: 'success'
            });
            this.$router.push({name: 'UploadPicture'})
          }
        }).catch(err => {
          this.$notify.error({
            title: '错误',
            message: '请联系管理员'
          });
          console.log(err)
        })
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .add_type {
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
</style>
