<template>
  <div class="index_wrap">
    <div class="welcome">
      <span>你好，</span>
      <span class="user_name">{{$store.state.userName}}</span>
      <span>，欢迎进入后台管理中心</span>
    </div>
    <ul class="ip_wrap">
      <li>登录IP：<span>{{ip}}</span></li>
      <li>登录时间：<span>{{ (new Date(loginTime).getFullYear())+'/'+(new Date(loginTime).getMonth()+1)+'/'+(new Date(loginTime).getDate())+' '+(new Date(loginTime).getHours())+':'+(new Date(loginTime).getMinutes())+':'+(new Date(loginTime).getSeconds())}}</span>
      </li>
    </ul>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        ip: '',
        loginTime: '',
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    created() {
      let that = this;
      console.log(that.$store.state.userName)
      this.$http.get('http://192.168.0.20:3000/getClientMsg', {
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
