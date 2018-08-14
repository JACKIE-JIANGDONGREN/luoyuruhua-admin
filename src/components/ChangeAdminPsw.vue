<template>
  <GeminiScrollbar class="add_admin_wrap">
    <bread-crumb></bread-crumb>
    <div class="add_admin_con">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="originalPassword">
          <el-input type="password" v-model="ruleForm2.originalPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')" :loading="btnStatus.info">{{btnStatus.text}}
          </el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </GeminiScrollbar>
</template>
<script>
  import BreadCrumb from './public/BreadCrumb';

  export default {
    name: "AddAdmin",
    data() {
      var validateOriginalPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z_][A-Za-z_0-9]{6,18}$/.test(this.ruleForm2.originalPassword)) {
            callback(new Error('密码为6-18位，包含字母、数字或下划线，不能以数字开头'));
          } else {
            callback();
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z_][A-Za-z_0-9]{6,18}$/.test(this.ruleForm2.password)) {
            callback(new Error('密码为6-18位，包含字母、数字或下划线，不能以数字开头'));
          } else if (this.ruleForm2.originalPassword == this.ruleForm2.password) {
            callback(new Error('新密码和原密码一致，请重新输入！'));
          } else {
            callback();
          }
        }
      };
      return {
        ruleForm2: {
          id: '',
          originalPassword: '',
          password: '',
        },
        rules2: {
          originalPassword: [
            {validator: validateOriginalPass, trigger: 'blur', required: true}
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
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnStatus = {info: true, text: '提交中'};
            this.$http({
              method: 'put',
              url: '/changeAdminPsw',
              data: this.ruleForm2
            }).then(res => {
              if (res.data.msg == '1') {
                this.btnStatus = {info: false, text: '提交'};
                this.$notify({
                  title: '成功',
                  message: res.data.des,
                  type: 'success'
                });
                this.cookie.setCookie('user', '', 15);
                this.$store.state.userName = '';
                this.$store.state.userPassword = '';
                setTimeout(function () {
                  _this.$router.replace({name: 'Login'});
                }, 1000);
              } else {
                this.btnStatus = {info: false, text: '提交'};
                this.$notify({
                  title: '警告',
                  message: res.data.des,
                  type: 'error'
                });
              }
            }).catch(function (err) {
              _this.$message({message: '更改密码失败！', type: 'error'});
              console.log(err)
            });
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
    created() {
      this.ruleForm2.id = this.$route.params.id;
    },
    mounted() {
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
