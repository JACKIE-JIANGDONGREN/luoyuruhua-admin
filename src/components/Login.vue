<template>
  <div class="login-container">
    <el-form autoComplete="on" label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title">用户登录</h3>
      <el-form-item prop="username">
        <el-input name="username" type="text" v-model="$store.state.userName" autoComplete="on" placeholder="username"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="$store.state.userPassword"
                  autoComplete="on"
                  placeholder="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        loading: false,
        pwdType: 'password'
      }
    },
    methods: {
      handleLogin() {
        let that = this;
        if (this.$store.state.userName == '' || this.$store.state.userPassword == '') {
          this.$message({message: '用户名或密码为空', type: 'warning'});
        }
        this.$http({
          method: 'post',
          url: '/login',
          data: {
            name: that.$store.state.userName,
            password: that.$store.state.userPassword
          },
          dataType: 'json'
        }).then(function (res) {
          if (res.data.msg == '2') {
            that.$message({message: '用户不存在！', type: 'error'});
          } else if (res.data.msg == '3') {
            that.$message({message: '密码不正确！', type: 'error'});
          } else if (res.data.msg == '1') {
            that.cookie.setCookie('user', res.data.user, 15);
            that.$router.push('index');
            that.$message({message: '登录成功', type: 'success'});
          }
        }).catch(function (err) {
          that.$message({message: '登录异常，请联系管理员！', type: 'error'});
          console.log(err)
        });
      }
    },
    mounted() {
      this.$store.commit('isLogin'); // 判断用户是否登录
    }
  }
</script>

<style scoped>
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #fff;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }

  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: #889aa4;
    height: 47px;
  }

  .el-input {
    display: inline-block;
    height: 100%;
    width: 100%;
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: #3E3C3C;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 320px;
    padding: 35px 40px 20px 40px;
    margin: 180px auto;
    -webkit-box-shadow: 0 0 10px 0px #B9B6B6 !important;
    box-shadow: 0 0 10px 0px #B9B6B6 !important;
    border-radius: 5px;
    -webkit-border-radius: 5px;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
</style>
