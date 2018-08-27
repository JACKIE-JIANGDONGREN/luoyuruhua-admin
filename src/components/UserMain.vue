<template>
  <gemini-scrollbar class="my-scroll-bar">
    <bread-crumb></bread-crumb>
    <div class="find_admin">
      <el-autocomplete
        style="margin-left: 20px;"
        popper-class="my-autocomplete"
        v-model="name"
        :fetch-suggestions="querySearchAsync"
        @select="handleSelectName"
        size="small"
        placeholder="用户名">
        <i
          class="el-icon-edit el-input__icon"
          slot="suffix">
        </i>
        <template slot-scope="{ item }">
          <span class="name">{{ item.name }}</span>
        </template>
      </el-autocomplete>
      <el-button type="primary" icon="el-icon-search" size="small" @click="getAdminInterface()">搜索</el-button>
    </div>
    <div class="admin_list">
      <template v-if="tableData.length>0">
        <el-table :data="tableData" stripe style="width: 100%" @selection-change="selectionChange" stripe
                  v-loading="loading"
                  :row-key='tableData.id' fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip="showText">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="用户名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="phone" label="手机号" :show-overflow-tooltip="showText"></el-table-column>
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
              <el-button type="text" size="small" @click="linkToEdit(scope.row.id)">编辑</el-button>
              <el-button type="text" size="small" @click="delUser(scope.row.id)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-else>
        <p>{{noData}}</p>
      </template>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 25, 35, 50]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </gemini-scrollbar>
</template>

<script>
  import BreadCrumb from './public/BreadCrumb';
  import moment from 'moment';  // use time plugs

  export default {
    name: "UserMain",
    data() {
      return {
        tableData: [],
        showText: true,
        name: '',
        timeout: null,
        timeout1: null,
        noData: '',
        currentPage: 1,
        totalCount: 0,
        showCount: 15,
        loading: true
      }
    },
    components: {
      BreadCrumb
    },
    mounted() {
      this.getAdminInterface();
    },
    methods: {
      getAdminInterface() {
        let that = this;
        this.$http({
          method: 'get',
          url: '/allUser',
          params: {
            name: that.name,
            currentPage: this.currentPage,
            showCount: this.showCount
          }
        }).then(function (res) {
          that.getAdminData(res);
        }).catch(function (err) {
          console.log(err)
        });
      },
      getAdminData(data) {
        let resData = data.data.Datas;
        this.totalCount = data.data.count;
        if (resData.length > 0) {
          for (var i = 0; i < resData.length; i++) {
            if (!resData[i].signature || resData[i].signature == '') {
              resData[i].signature = '这个家伙懒的一笔！'
            }
            if (resData[i].age == '' || !resData[i].age) {
              resData[i].age = 'NULL';
            }
            if (resData[i].phone == '') {
              resData[i].phone = 'NULL';
            }
            if (resData[i].email == '') {
              resData[i].email = 'NULL';
            }
            if (resData[i].sex == '' || !resData[i].sex) {
              resData[i].sex = 'NULL';
            } else if (resData[i].sex == '1') {
              resData[i].sex = '男';
            } else {
              resData[i].sex = '女';
            }
            if (resData[i].createTime) {
              resData[i].createTime = moment(resData[i].createTime).format('YYYY-MM-DD HH:mm:ss');
            }
          }
          this.tableData = resData;
          this.loading = false;
        } else {
          this.tableData = [];
          this.loading = false;
          this.noData = '没有找到合适的资源';
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
          return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelectName(item) {
        this.name = item.name;
      },
      linkToEdit(id) {
        this.$http({
          method: 'get',
          url: '/authPermission',
          params: {
            name: this.cookie.getCookie('user')
          }
        }).then((data) => {
          if (data.data.isAuth == 'auth') {
            this.$router.push({name: 'EditUser', params: {id: id}})
          } else {
            this.$notify({
              title: '警告',
              message: '权限不足，无法编辑用户信息！',
              type: 'warning'
            });
          }
        }).catch((err) => {
          this.$message({message: '获取权限异常，请联系管理员！', type: 'error'});
          console.log(err)
        })
      },
      selectionChange(selection) {
        console.log(selection)
      },
      handleSizeChange(val) {
        this.showCount = val;
        this.getAdminInterface();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getAdminInterface();
      },
      delUser(id) {
        this.$http({
          method: 'get',
          url: '/authPermission',
          params: {
            name: this.cookie.getCookie('user')
          }
        }).then((data) => {
          if (data.data.isAuth == 'auth') {
            this.delUserFun(id);
          } else {
            this.$notify({
              title: '警告',
              message: '权限不足，无法进行相应操作！',
              type: 'warning'
            });
          }
        }).catch((err) => {
          this.$message({message: '获取权限异常，请联系管理员！', type: 'error'});
          console.log(err)
        })
      },
      delUserFun(userId) {
        this.$confirm('确认是否要删除该用户', '删除用户', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: '/delUser',
            data: {
              id: userId
            }
          }).then((data) => {
            if (data.data.msg == '1') {
              this.$message({title: '成功', message: data.data.des, type: 'success'});
              this.getAdminInterface();
            }
          }).catch((err) => {
            this.$message({title: '失败', message: '删除用户失败，请联系管理员！', type: 'error'});
            console.log(err)
          })
        }).catch(action => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        });
      }
    }
  }
</script>

<style scoped>
  .my-scroll-bar {
    height: 100%;
    overflow: auto;
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

  .admin_list > p {
    text-align: center;
    line-height: 70px;
    color: #f00;
  }

  .pagination {
    float: right;
    padding: 50px 50px 40px;
  }
</style>
