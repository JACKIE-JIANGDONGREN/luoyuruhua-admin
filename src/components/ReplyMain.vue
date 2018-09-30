<template>
  <gemini-scrollbar class="my-scroll-bar">
    <bread-crumb></bread-crumb>
    <div class="find_admin">
      <el-select v-model="channelId" placeholder="请选择" size="small" @change="selectChannelType()">
        <el-option
          v-for="item in channelType"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
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
      <el-button type="primary" icon="el-icon-search" size="small" @click="commentData()">搜索</el-button>
    </div>
    <div class="admin_list">
      <template v-if="tableData.length>0">
        <el-table :data="tableData" stripe style="width: 100%" @selection-change="selectionChange" stripe
                  v-loading="loading"
                  :row-key='tableData._id' fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="createTime" label="评论时间" :show-overflow-tooltip="showText">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.replyData.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="replyData.to.name" label="评论者"></el-table-column>
          <el-table-column prop="replyData.from.name" label="评论对象"></el-table-column>
          <el-table-column prop="replyData.content" label="评论内容" :show-overflow-tooltip="showText"></el-table-column>
          <el-table-column prop="status" label="评论类别" :show-overflow-tooltip="showText"></el-table-column>
          <el-table-column prop="notesData.title" label="类别标题" :show-overflow-tooltip="showText"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="linkToEdit()">编辑</el-button>
              <el-button type="text" size="small"
                         @click="delComment(scope.row._id,scope.row.replyData._id,scope.row.notesData._id,channelId)">移除
              </el-button>
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
    name: "ReplyMain",
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
        dataRange: [],
        channelId: 0,
        channelType: [{id: 0, name: '随笔'}, {id: 1, name: '作品集'}, {id: 2, name: '相册'}, {id: 3, name: '音乐'}, {
          id: 4,
          name: '关于'
        }, {id: 5, name: '留言'}]
      }
    },
    components: {
      BreadCrumb
    },
    mounted() {
      this.commentData();
    },
    methods: {
      getCommentFun(data) {
        let resData = data.data.Data;
        this.totalCount = data.data.total;
        if (resData) {
          for (var i = 0; i < resData.length; i++) {
            resData[i].replyData.createTime = moment(resData[i].replyData.createTime).format('YYYY-MM-DD HH:mm:ss');
            resData[i].status = this.channelType[resData[i].status].name;
            if (!resData[i].replyData.from) {
              resData[i].replyData.from = {name: '没有评论对象'};
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
      linkToEdit(id) {
        alert('该功能暂未开放');
      },
      selectionChange(selection) {
        console.log(selection)
      },
      handleSizeChange(val) {
        this.showCount = val;
        this.commentData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.commentData();
      },
      delComment(commentId, commentChildId, articleID, channelId) {
        this.$http({
          method: 'get',
          url: '/authPermission',
          params: {
            name: this.cookie.getCookie('user')
          }
        }).then((data) => {
          if (data.data.isAuth == 'auth') {
            this.delCommentFun(commentId, commentChildId, articleID, channelId);
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
      delCommentFun(commentId, commentChildId, articleID, channelId) {
        this.$confirm('确认是否要删除该用户', '删除用户', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: '/deleteComment',
            data: {
              commentId: commentId,
              commentChildId: commentChildId,
              articleID: articleID,
              channelId: channelId
            }
          }).then((data) => {
            console.log(data)
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
        this.dataRange = data;
      },
      selectChannelType(val) {
        this.commentData();
      },
      commentData() {
        this.$http({
          method: 'get',
          url: '/getCommentData',
          params: {
            channelId: this.channelId,
            dataTime: this.dataRange,
            currentPage: this.currentPage,
            showCount: this.showCount
          },
        }).then(data => {
          this.getCommentFun(data);
        }).catch(err => {
          this.$message({title: '失败', message: '获取评论失败，请联系管理员！', type: 'error'});
          console.log(err)
        })
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
