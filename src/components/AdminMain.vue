<template>
  <GeminiScrollbar class="my-scroll-bar">
    <bread-crumb></bread-crumb>
    <div class="find_admin">
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="state3"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容">
        <i
          class="el-icon-edit el-input__icon"
          slot="suffix">
        </i>
        <template slot-scope="{ item }">
          <span class="name">{{ item.name }}</span>
        </template>
      </el-autocomplete>
    </div>
    <div class="admin_list">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip="showText"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="email" label="邮箱" :show-overflow-tooltip="showText"></el-table-column>
        <el-table-column prop="userImg" label="头像"></el-table-column>
        <el-table-column prop="signature" label="签名" :show-overflow-tooltip="showText"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </GeminiScrollbar>
</template>

<script>
  import BreadCrumb from './public/BreadCrumb';
  import Config from '../../util/config';
  import moment from 'moment';  // use time plugs

  export default {
    name: "Admin",
    data() {
      return {
        tableData: [],
        showText: true,
        state3: '',
        timeout: null
      }
    },
    components: {
      BreadCrumb
    },
    mounted() {
      let that = this;
      this.$http({
        method: 'get',
        url: Config.host + ':' + Config.port + '/findAllAdmin',
        params: {}
      }).then(function (res) {
        that.getAdminData(res);
      }).catch(function (err) {
        console.log(err)
      });
    },
    methods: {
      getAdminData(data) {
        let resData = data.data.res;
        if (resData.length > 0) {
          for (var i = 0; i < resData.length; i++) {
            if (!resData[i].userImg || resData[i].userImg == '') {
              resData[i].userImg = 'NULL';
            }
            if (!resData[i].signature || resData[i].signature == '') {
              resData[i].signature = '这个家伙懒的一笔！'
            }
            if (resData[i].sex == '1') {
              resData[i].sex = '男';
            } else {
              resData[i].sex = '女';
            }
            if (resData[i].createTime) {
              resData[i].createTime = moment(resData[i].createTime).format('YYYY-MM-DD HH:mm:ss');
            }
          }
          this.tableData = resData;
        }
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.tableData;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      }
    }
  }
</script>

<style scoped>
  .my-scroll-bar {
    height: 100%;
  }

  .public_nav {
    margin-left: 20px;
    margin-top: 20px;
  }

  .admin_list, .find_admin {
    padding: 20px;
  }

  .my-autocomplete li {
    line-height: normal;
    padding: 7px;
  }

  .my-autocomplete .name {
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
