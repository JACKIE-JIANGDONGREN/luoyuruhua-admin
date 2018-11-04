<template>
  <GeminiScrollbar>
    <bread-crumb></bread-crumb>
    <div class="upload_img">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="des">
          <el-input v-model.number="ruleForm2.des"></el-input>
        </el-form-item>
        <el-form-item label="上传到">
          <el-select v-model="ruleForm2.kind" placeholder="请选择" size="small" @change="selectChannelType()">
            <el-option
              v-for="item in channelType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传列表">
          <input type="file" name="file" id="file" multiple="multiple"
                 accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
          <el-button size="small" type="primary" @click="insertImg()">点击上传</el-button>
          <ul class="el-upload-list el-upload-list--text">
            <li tabindex="0" class="el-upload-list__item is-success" v-for="(item,index) in this.ruleForm2.imgArr">
              <!----><a
              class="el-upload-list__item-name"><i
              class="el-icon-document"></i>{{item.name}}
            </a><label class="el-upload-list__item-status-label"><i
              class="el-icon-upload-success el-icon-circle-check"></i></label><i class="el-icon-close"
                                                                                 @click="delImg(item.url)"></i><i
              class="el-icon-close-tip" @click="delImg(item.url)">按 delete 键可删除</i><!----><!----></li>
          </ul>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')" :disabled="permissions" :loading="btnStatus.info">
            {{btnStatus.text}}
          </el-button>
          <el-button @click="resetForm('ruleForm2')" :disabled="permissions">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </GeminiScrollbar>
</template>
<script>
  import BreadCrumb from './public/BreadCrumb';

  export default {
    name: "UploadPicture",
    data() {
      var validateDes = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('描述一下吧'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          des: '',
          kind: 0,
          imgArr: []
        },
        channelType: [{id: 0, name: '随笔'}, {id: 1, name: '作品集'}, {id: 2, name: '相册'}, {id: 3, name: '音乐'}, {
          id: 4,
          name: '关于'
        }, {id: 5, name: '留言'}],
        rules2: {
          des: [
            {validator: validateDes, trigger: 'blur', required: true}
          ]
        },
        btnStatus: {
          info: false,
          text: '提交'
        },
        permissions: true
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnStatus = {info: true, text: '提交中'};
            this.$http({
              method: 'post',
              url: '/addUser',
              data: this.ruleForm2
            }).then(res => {
              if (res.data.msg == '1') {
                this.btnStatus = {info: false, text: '提交'};
                this.$notify({
                  title: '成功',
                  message: res.data.des,
                  type: 'success'
                });
                setTimeout(() => {
                  this.$router.push({name: 'UserMain'});
                }, 1000);
              } else {
                this.btnStatus = {info: false, text: '提交'};
                this.$notify({
                  title: '警告',
                  message: res.data.des,
                  type: 'error'
                });
              }
            }).catch(err => {
              this.$message({message: '请求异常，请联系管理员！', type: 'error'});
              console.log(err)
            });
          } else {
            this.$notify({
              title: '警告',
              message: '请按需求填入用户信息！',
              type: 'error'
            });
            return false;
          }
        });
      },
      insertImg() {
        let file = document.getElementById("file");
        let formData = new FormData();
        console.log(file.files);
        for (var i in file.files) {
          if (parseInt((file.files[i].size)) / 1024 / 1024 > 5) {
            this.$notify({
              title: '警告',
              message: '选择的图片当中有大于5MB的，系统已为您忽略该张图片',
              type: 'error'
            });
          } else {
            formData.append('file', file.files[i]);
          }
        }
        if (file.files.length == 0) {
          this.$message.error('请选择要上传的图片');
        } else if (file.files.length > 10) {
          this.$message.error('选择上传的图片不得超过十张');
        } else {
          this.$http({
            method: 'post',
            url: '/uploadImg',
            data: formData
          }).then(data => {
            this.ruleForm2.imgArr = data.data.imgArr;
            this.$message({
              message: '上传成功',
              type: 'success'
            });
            console.log(data)
          }).catch(err => {
            console.log(err)
          });
        }
      },
      delImg(index) {
        this.ruleForm2.imgArr.splice(index, 1);
        console.log(this.ruleForm2.imgArr)
      }
    },
    components: {
      BreadCrumb
    },
    mounted() {
      this.$http({
        url: '/authPermission',
        params: {
          name: this.cookie.getCookie('user')
        }
      }).then(data => {
        if (data.data.isAuth == 'auth') {
          this.permissions = false;
        } else {
          this.$notify({
            title: '警告',
            message: '拥有最高权限才能添加用户！',
            type: 'error'
          });
        }
      }).catch(err => {
        this.$message({message: '获取权限失败，请联系管理员！', type: 'error'});
        console.log(err)
      })
    }
  }
</script>
<style scoped>
  .upload_img {
    width: 780px;
  }

  .demo-ruleForm {
    width: 460px;
    margin: 40px 20px 20px;
    height: 100%;
    overflow: auto;
  }

</style>
