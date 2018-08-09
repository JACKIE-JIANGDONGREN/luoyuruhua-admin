<template>
  <div class="right_slide_top">
    <div class="spread" @click="spreadFun()">
      <img src="../../assets/spread.png" alt="">
    </div>
    <p class="user_title">欢迎<span>{{name}}</span>回来！</p>
    <div class="user_des">
      <el-dropdown trigger="click" @command="handleCommand">
        <div>
          <div class="user_img"><img src="~public_img/726209185373770133.jpg" alt=""></div>
          <span class="el-dropdown-link">{{name}}<i
            class="el-icon-arrow-down el-icon--right"></i></span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">个人资料</el-dropdown-item>
          <el-dropdown-item command="1">修改密码</el-dropdown-item>
          <el-dropdown-item command="2">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import bus from '../../../util/eventBus';

  export default {
    name: "RightSlide",
    data() {
      return {
        name: ''
      }
    },
    methods: {
      spreadFun() {
        this.$store.state.spreadInfo ? this.$store.state.spreadInfo = false : this.$store.state.spreadInfo = true;
      },
      handleCommand(val) {
        if (val == '2') {
          this.cookie.setCookie('user', '', 0);
          this.$store.state.userName = '';
          this.$store.state.userPassword = '';
          this.$router.replace({name: 'Login'})
        } else if (val == '0') {
          this.$router.push({name: 'AdminDetail', params: {id: this.$store.state.userId}})
        } else if (val == '1') {
          this.$router.push({name: 'EditAdmin', params: {id: this.$store.state.userId}})
        }
      }
    },
    created() {
      bus.$on('getUserName', msg => {
        this.name = msg;
      });
    }
  }
</script>

<style scoped>
  .right_slide_top {
    height: 70px;
    background: rgb(84, 92, 100);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 998;
    width: 100%;
    text-align: center;
  }

  .spread {
    width: 32px;
    height: auto;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    cursor: pointer;
  }

  .spread img {
    display: block;
    width: 100%;
    height: auto;
    vertical-align: middle;
  }

  .user_title {
    color: #fff;
    line-height: 70px;
  }

  .user_title span {
    margin: 0 10px;
    color: rgb(255, 208, 75);
  }

  .user_des {
    position: absolute;
    right: 30px;
    top: 0;
    cursor: pointer;
  }

  .user_des .user_img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    overflow: hidden;
    float: left;
    margin: 15px 10px;
  }

  .user_des .user_img img {
    display: block;
    width: 100%;
    height: auto;
  }

  .user_des .el-dropdown {
    float: right;
    line-height: 70px;
    margin-left: 10px;
    color: #fff;
  }
</style>
