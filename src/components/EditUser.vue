<template>
  <GeminiScrollbar class="admin_detail">
    <bread-crumb></bread-crumb>
    <div class="edit_wrap">
      <div class="add_admin_con">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input type="text" v-model="ruleForm2.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input type="text" v-model="ruleForm2.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm2.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="ruleForm2.age"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input type="textarea" v-model="ruleForm2.signature" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" :loading="btnStatus.info">{{btnStatus.text}}
            </el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="com-upload-img">
        <div class="img_group">
          <div class="img_box" id="show_upload">
            <img :src=ruleForm2.imgUrl alt="">
            <div class="filter">
              <input type="file" accept="image/*" @change="changeImg($event)">
            </div>
          </div>
          <p>点击上传</p>
        </div>
      </div>
    </div>
  </GeminiScrollbar>
</template>
<script>
  import BreadCrumb from './public/BreadCrumb';

  export default {
    name: 'EditUser',
    data() {
      var validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z_][A-Za-z_0-9]{6,18}$/.test(this.ruleForm2.password)) {
            callback(new Error('密码为6-18位，包含字母、数字或下划线，不能以数字开头'));
          } else {
            callback();
          }
        }
      };
      return {
        ruleForm2: {
          name: '',
          phone: '',
          password: '',
          email: '',
          age: '',
          sex: '',
          signature: ''
        },
        rules2: {
          name: [
            {validator: validateUserName, trigger: 'blur', required: true}
          ],
          password: [
            {validator: validatePass, trigger: 'blur', required: true}
          ]
        },
        btnStatus: {
          info: false,
          text: '提交'
        }
      }
    },
    components: {
      BreadCrumb
    },
    methods: {
      changeImg: function (e) {
        let _this = this;
        let imgLimit = 1024;
        let files = e.target.files;
        let image = new Image();
        let base64 = '';
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
                base64 = canvas.toDataURL("image/" + ext, quality);
                _this.ruleForm2.imgUrl = base64;
                _this.url = '';
                console.log(_this.ruleForm2.imgUrl)
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
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$notify({
              title: '警告',
              message: '待开发！',
              type: 'error'
            });
          } else {
            that.$notify({
              title: '警告',
              message: '请完善所需要的用户信息！',
              type: 'error'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.$http({
        method: 'get',
        url: '/userDetail',
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        let data = res.data.Data;
        this.ruleForm2.imgUrl = data.userImg;
        this.ruleForm2.name = data.name;
        this.ruleForm2.password = data.password;
        this.ruleForm2.phone = data.phone;
        this.ruleForm2.sex = data.sex;
        this.ruleForm2.email = data.email;
        this.ruleForm2.age = data.age;
        this.ruleForm2.userId = data.id;
        this.ruleForm2.signature = data.signature;
      }).catch(err => {
        this.$message({message: '获取详情失败，请联系管理员！', type: 'error'});
        console.log(err)
      });
    }
  }
</script>

<style scoped>
  .com-upload-img {
    padding: 40px 0 0 50px;
  }

  .demo-ruleForm {
    width: 460px;
    margin: 40px 20px 20px;
    height: 100%;
    overflow: auto;
  }

  .edit_wrap {
    overflow: hidden;
  }

  .edit_wrap .add_admin_con, .edit_wrap .com-upload-img {
    float: left;
  }

  .com-upload-img .img_group {
    width: 120px;
    height: 120px;
    position: relative;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
  }

  .com-upload-img .img_group .img_box {
    width: 100%;
    height: 100%;
  }

  .com-upload-img .img_group img {
    display: block;
    width: 100%;
    height: auto;
  }

  .com-upload-img .img_group .filter {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }

  .com-upload-img .img_group .filter input {
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .com-upload-img .img_group:hover .filter {
    background: rgba(0, 0, 0, .5);
  }

  .com-upload-img .img_group:hover p {
    display: block;
  }

  .com-upload-img .img_group p {
    display: none;
    color: #fff;
    font-size: 14px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    z-index: 101;
  }
</style>
