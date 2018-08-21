<template>
  <GeminiScrollbar class="add_admin_wrap">
    <bread-crumb></bread-crumb>
    <div class="add_admin_con">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="ruleForm2.name" auto-complete="off" :disabled="permissions"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off" :disabled="permissions"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input type="text" v-model="ruleForm2.phone" auto-complete="off" :disabled="permissions"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input type="text" v-model="ruleForm2.email" auto-complete="off" :disabled="permissions"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="ruleForm2.sex" :disabled="permissions">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model.number="ruleForm2.age" :disabled="permissions"></el-input>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input type="textarea" v-model="ruleForm2.signature" auto-complete="off"
                    :disabled="permissions"></el-input>
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
    name: "AddUser",
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
  .add_admin_con {
    width: 780px;
  }

  .demo-ruleForm {
    width: 460px;
    margin: 40px 20px 20px;
    height: 100%;
    overflow: auto;
  }

</style>
