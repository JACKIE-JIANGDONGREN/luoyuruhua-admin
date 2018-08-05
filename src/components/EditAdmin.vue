<template>
  <GeminiScrollbar class="admin_detail">
    <bread-crumb></bread-crumb>
    <div class="add_admin_con">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="管理员名称" prop="name">
          <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="text" v-model="ruleForm2.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input type="text" v-model="ruleForm2.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm2.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
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
        <div class="img_box" v-if="allowAddImg">
          <input type="file" accept="image/*" @change="changeImg($event)">
          <div class="filter"></div>
        </div>
        <div class="img_box" v-for="(item,index) in imgArr" :key="index">
          <div class="img_show_box">
            <img :src="item" alt="">
            <i class="img_delete" @click="deleteImg(index)"
               style="width: 20px;height: 20px;background: #f00;display: block;"></i>
          </div>
        </div>
      </div>
    </div>
  </GeminiScrollbar>
</template>
<script>
  import BreadCrumb from './public/BreadCrumb';
  import Config from '../../util/config';

  export default {
    name: 'AdminDetail',
    data() {
      var validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入管理员名称'));
        } else {
          callback();
        }
      };
      var validateUserPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.ruleForm2.phone))) {
          callback(new Error('手机号有误，请重新输入'));
        } else {
          callback();
        }
      };
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        imgData: '',
        imgArr: [],
        imgSrc: '',
        allowAddImg: true,
        userId: '',
        ruleForm2: {
          name: '周宏宇',
          phone: '',
          email: '',
          age: '',
          sex: '',
          signature: ''
        },
        rules2: {
          name: [
            {validator: validateUserName, trigger: 'blur', required: true}
          ],
          phone: [
            {validator: validateUserPhone, trigger: 'blur', required: true}
          ],
          age: [
            {validator: checkAge, trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择您的性别', trigger: 'change'}
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
        if (files.length > 0) {
          let dd = 0;
          let timer = setInterval(function () {
            if (files.item(dd).type != 'image/png' && files.item(dd).type != 'image/jpeg' && files.item(dd).type != 'image/gif') {
              return false;
            }

            if (files.item(dd).size > imgLimit * 102400) {
              //to do sth
            } else {
              image.src = window.URL.createObjectURL(files.item(dd));
              image.onload = function () {
                // 默认按比例压缩
                let w = 100,
                  h = 100,
                  scale = w / h;
                w = 200;
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
                // 回调函数返回base64的值
                if (_this.imgArr.length <= 4) {
                  _this.imgArr.unshift('');
                  _this.imgArr.splice(0, 1, base64);//替换数组数据的方法，此处不能使用：this.imgArr[index] = url;
                  if (_this.imgArr.length >= 5) {
                    _this.allowAddImg = false;
                  }
                }
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
      deleteImg: function (index) {
        this.imgArr.splice(index, 1);
        if (this.imgArr.length < 5) {
          this.allowAddImg = true;
        }
      },
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.btnStatus = {info: true, text: '提交中'};
            this.$http({
              method: 'post',
              url: Config.host + ':' + Config.port + '/addAdmin',
              data: that.ruleForm2
            }).then(function (res) {
              if (res.data.msg == '1') {
                that.btnStatus = {info: false, text: '提交'};
                that.$notify({
                  title: '成功',
                  message: res.data.des,
                  type: 'success'
                });
                setTimeout(function () {
                  that.$router.push({name: 'AdminMain'});
                }, 1000);
              } else {
                that.btnStatus = {info: false, text: '提交'};
                that.$notify({
                  title: '警告',
                  message: res.data.des,
                  type: 'error'
                });
              }
            }).catch(function (err) {
              console.log(err)
            });
          } else {
            that.$notify({
              title: '警告',
              message: '请输入要添加的管理员信息',
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
    mounted() {
      console.log(this.$route.params.id);
      this.$http({
        method: 'get',
        url: Config.host + ':' + Config.port + '/adminDetail',
        params: {
          id: this.$route.params.id
        }
      }).then(function (res) {
        console.log(res)
      }).catch(function (err) {
        console.log(err)
      });
    }
  }
</script>

<style scoped>
  .com-upload-img {
    padding: 20px 0 0 20px;
  }

  .demo-ruleForm {
    width: 460px;
    margin: 40px 20px 20px;
    height: 100%;
    overflow: auto;
  }
</style>
