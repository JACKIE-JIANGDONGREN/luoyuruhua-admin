<template>
  <GeminiScrollbar class="my-scroll-bar">
    <bread-crumb></bread-crumb>
    <div class="find_admin">
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="userphone"
        :fetch-suggestions="querySearchAsync"
        @select="handleSelectPhone"
        size="small"
        placeholder="手机号">
        <i
          class="el-icon-edit el-input__icon"
          slot="suffix">
        </i>
        <template slot-scope="{ item }">
          <span class="name">{{ item.phone }}</span>
        </template>
      </el-autocomplete>
      <el-button type="primary" icon="el-icon-search" size="small" @click="getAdminInterface()">搜索</el-button>
    </div>
    <div class="admin_list">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip="showText"></el-table-column>
        <el-table-column prop="name" label="管理员"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="email" label="邮箱" :show-overflow-tooltip="showText"></el-table-column>
        <el-table-column prop="userImg" label="头像">
          <template slot-scope="scope">
            <div class="user_img">
              <img :src="scope.row.userImg" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="signature" label="签名" :show-overflow-tooltip="showText"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="linkToDetail(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" @click="linkToEdit(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </GeminiScrollbar>
</template>

<script>
  import BreadCrumb from './public/BreadCrumb';
  import moment from 'moment';  // use time plugs

  export default {
    name: "Admin",
    data() {
      return {
        tableData: [],
        showText: true,
        username: '',
        userphone: '',
        timeout: null,
        timeout1: null
      }
    },
    components: {
      BreadCrumb
    },
    mounted() {
      this.$store.commit('isLogin');
      this.getAdminInterface();
    },
    methods: {
      getAdminInterface() {
        let that = this;
        this.$http({
          method: 'get',
          url: '/findAllAdmin',
          params: {
            phone: that.userphone
          }
        }).then(function (res) {
          that.getAdminData(res);
        }).catch(function (err) {
          console.log(err)
        });
      },
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
        let restaurants = this.tableData;
        let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 2000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.phone.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelectPhone(item) {
        this.userphone = item.phone;
      },
      linkToDetail(id) {
        if (id == this.$store.state.userId) {
          this.$router.push({name: 'AdminDetail', params: {id: id}})
        } else {
          this.$notify({
            title: '警告',
            message: '权限不足，无法查看其他管理员信息！',
            type: 'warning'
          });
        }
      },
      linkToEdit(id) {
        if (id == this.$store.state.userId) {
          this.$router.push({name: 'EditAdmin', params: {id: id}})
        } else {
          this.$notify({
            title: '警告',
            message: '权限不足，无法编辑其他管理员信息！',
            type: 'warning'
          });
        }
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
    padding: 20px 0 0 20px;
  }

  .my-autocomplete li {
    line-height: normal;
    padding: 7px;
  }

  .my-autocomplete .name {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .user_img img {
    width: 60px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    overflow: hidden;
  }
</style>
