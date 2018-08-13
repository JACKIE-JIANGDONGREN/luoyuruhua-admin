<template>
  <GeminiScrollbar class="add_admin_wrap">
    <bread-crumb></bread-crumb>
    <div class="add_admin_con">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="管理员名称" prop="name">
          <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="text" v-model="ruleForm2.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
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
  </GeminiScrollbar>
</template>
<script>
  import BreadCrumb from './public/BreadCrumb';
  export default {
    name: "AddAdmin",
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
          phone: [
            {validator: validateUserPhone, trigger: 'blur', required: true}
          ],
          password: [
            {validator: validatePass, trigger: 'blur', required: true}
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
    methods: {
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.btnStatus = {info: true, text: '提交中'};
            this.$http({
              method: 'post',
              url: '/api/addAdmin',
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
    components: {
      BreadCrumb
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
