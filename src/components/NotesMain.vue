<template>
  <gemini-scrollbar class="my-scroll-bar">
    <bread-crumb></bread-crumb>
    <div class="find_admin">
      <el-date-picker
        style="margin-left: 20px;"
        v-model="dataRange"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="onPick($event)"
        size="small"
        :picker-options="pickerOptions2">
      </el-date-picker>
      <el-autocomplete
        style="margin-left: 30px;"
        popper-class="my-autocomplete"
        v-model="title"
        :fetch-suggestions="querySearchAsync"
        @select="handleSelectName"
        size="small"
        placeholder="文章标题">
        <i
          class="el-icon-edit el-input__icon"
          slot="suffix">
        </i>
        <template slot-scope="{ item }">
          <span class="name">{{ item.title }}</span>
        </template>
      </el-autocomplete>
      <el-button type="primary" icon="el-icon-search" size="small" @click="getNotesInterface()">搜索</el-button>
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
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="category" label="分类"></el-table-column>
          <el-table-column prop="age" label="关键词">
            <template slot-scope="scope">
              <div>
                <span v-for="item of scope.row.tag">{{item}}&nbsp;&nbsp;</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="概要" :show-overflow-tooltip="showText"></el-table-column>
          <el-table-column prop="content" label="内容" :show-overflow-tooltip="showText">
            <template slot-scope="scope">
              <div>请编辑查看</div>
            </template>
          </el-table-column>
          <el-table-column prop="author.name" label="作者" :show-overflow-tooltip="showText"></el-table-column>
          <el-table-column prop="thumbImg" label="缩略图">
            <template slot-scope="scope">
              <div class="user_img">
                <img :src="scope.row.thumbImg" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="pageView" label="浏览量" :show-overflow-tooltip="showText"></el-table-column>
          <el-table-column prop="replyData.length" label="评论" :show-overflow-tooltip="showText"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="linkToEdit(scope.row._id)">编辑</el-button>
              <el-button type="text" size="small" @click="delNotes(scope.row._id,scope.row.author._id)">移除</el-button>
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
    name: "NotesMain",
    data() {
      return {
        tableData: [],
        showText: true,
        title: '',
        timeout: null,
        timeout1: null,
        noData: '',
        currentPage: 1,
        totalCount: 1,
        showCount: 15,
        loading: true,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dataRange: ''
      }
    },
    components: {
      BreadCrumb
    },
    mounted() {
      this.getNotesInterface();
    },
    methods: {
      getNotesInterface() {
        this.$http({
          method: 'get',
          url: '/allNotes',
          params: {
            title: this.title,
            currentPage: this.currentPage,
            showCount: this.showCount,
            dataRange: this.dataRange
          }
        }).then(res => {
          this.getAdminData(res);
        }).catch(err => {
          this.$message({message: '获取随笔失败，请联系管理员！', type: 'error'});
          console.log(err)
        });
      },
      getAdminData(data) {
        let resData = data.data.Datas;
        this.totalCount = data.data.totalCount;
        if (resData.length > 0) {
          for (var i = 0; i < resData.length; i++) {
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
          return (state.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelectName(item) {
        this.title = item.title;
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
            this.$router.push({name: 'EditNotes', params: {id: id}})
          } else {
            this.$notify({
              title: '警告',
              message: '权限不足，无法编辑随笔！',
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
        this.getNotesInterface();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getNotesInterface();
      },
      delNotes(id, authorId) {
        this.$http({
          method: 'get',
          url: '/authPermission',
          params: {
            name: this.cookie.getCookie('user')
          }
        }).then((data) => {
          if (data.data.isAuth == 'auth') {
            this.delNotesFun(id, authorId);
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
      delNotesFun(notesId, id) {
        this.$confirm('确认是否要删除该用户', '删除用户', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: '/delNotes',
            data: {
              id: id,
              notesId: notesId
            }
          }).then((data) => {
            if (data.data.msg == '1') {
              this.getNotesInterface();
              this.$message({title: '成功', message: data.data.des, type: 'success'});
            }
          }).catch((err) => {
            this.$message({title: '失败', message: '删除随笔失败，请联系管理员！', type: 'error'});
            console.log(err)
          })
        }).catch(action => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        });
      },
      onPick(data) {
        this.dataRange = data
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

  .user_img {
    width: 100px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    overflow: hidden;
  }

  .user_img img {
    display: block;
    width: 100%;
    height: auto;
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
