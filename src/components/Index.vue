<template>
  <div class="index_wrap">
    <div class="welcome">
      <span>你好，</span>
      <span class="user_name">{{$store.state.userName}}</span>
      <span>，欢迎进入后台管理中心</span>
    </div>
    <ul class="ip_wrap">
      <li>登录IP：<span>{{ip}}</span></li>
      <li>登录时间：<span>{{loginTime|dateFor}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import Config from '../../util/config';
  import moment from 'moment';

  export default {
    name: "Index",
    data() {
      return {
        ip: '',
        loginTime: ''
      }
    },
    created() {
      let that = this;
      this.$http.get(Config.host + ':' + Config.port + '/getClientMsg', {
        params: {
          name: that.$store.state.userName
        }
      }).then(function (res) {
        if (res.data.msg == '1') {
          that.ip = res.data.ip.toString().substr(7);
          that.loginTime = res.data.loginTime;
        }
      }).catch(function (err) {
        console.log(err)
      });
    },
    mounted() {
    },
    filters: {
      dateFor(el) {
        return moment(el).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }
</script>

<style scoped>
  .index_wrap {
    padding: 20px;
  }

  .welcome span {
    color: #999999;
  }

  .welcome span.user_name {
    color: #409eff;
  }

  .ip_wrap {
    overflow: hidden;
    margin-top: 20px;
  }

  .ip_wrap li {
    width: 30%;
    float: left;
    font-size: 15px;
    color: #555;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
